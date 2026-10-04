# Barbierro DB Schema Revision (10/03 discussion) — Implementation Prompt

Source of truth: `documentation/Barbierro DB architecture (10_03).xlsx`, diffed against the
prior version `documentation/Barbierro DB architecture.xlsx`. Every change below was verified
by a cell-by-cell diff of the two workbooks (not just the yellow highlight fills — a few real
changes in the new file were **not** highlighted, so highlight color alone is not a reliable
signal; they're called out explicitly where that's the case).

This repo already has a parallel pattern you must follow for every change: a **Prisma schema**
(`prisma/models/*.prisma`) that documents the data model and drives migrations, plus **hand-written
SQL** (`src/queries/**/*.sql`) compiled by `@pgtyped/cli` into typed query modules
(`src/queries/**/*.queries.ts`, config in `pgtyped.config.json`) that the controllers actually
call at runtime via `pg.Pool` (`src/database/client.ts`). The Prisma Client itself
(`src/generated/prisma`) is not imported anywhere in `src/controllers` or `src/queries` —
it exists for schema/migration purposes. **Both layers must be kept in sync** for every change
below.

Also update `.agents/skills/README-Barbierro-Prisma-Agent.md` (and the duplicate copies under
`.claude/skills/` / `.windsurf/skills/` if those are meant to mirror it — check before touching)
since it's the "complete source of truth" snapshot of the schema for other agents and will go
stale otherwise.

Work through the sections in order. Section 1 is the highest-impact structural change; sections
2–4 are additive/contained. Section 5 lists things to flag back to me rather than guess on.

---

## 1. `bph_sales` → header/detail split (NEW `bph_sales_item` table)

**What changed:** `barber_id` and `service_code` are removed from `bph_sales` entirely. A brand
new sheet/table `bph_sales_item` appeared in the revised workbook — it did not exist before —
which holds the per-line-item detail that used to live directly on the sale header. A new
field `remarks` was also added to the header. This is a header → header+line-items
restructuring (one sale transaction can now have multiple service/barber line items instead of
exactly one).

### 1a. `bph_sales` (header) — final field list
Keep as-is: `transaction_id` (PK), `transaction_date`, `customer_id`, `branch_id`,
`payment_method`, `reference_no`, `total_amount`, `count_1`...`count_1000`, `created_by`.

- **Remove**: `barber_id`, `service_code` (and their FK relations) from this table.
- **Add**: `remarks` — String, nullable, free text ("Info/additional info provided by cashier").

### 1b. New table `bph_sales_item`
Fields (from the new sheet, unchanged from what's documented there):
- `transaction_id` — String, key field, FK → `bph_sales.transaction_id`
- `item_number` — String, key field (e.g. "01", "02", "03")
- `service_code` — String, FK → `bph_services.service_code`
- `barber_id` — String, FK → `bph_barbers.barber_id`
- `amount` — Decimal, "amount based from service code, can also be editable"

Composite primary key: `(transaction_id, item_number)`.

### 1c. Prisma (`prisma/models/dashboard_model.prisma`)
- Update `BphSale`: drop `barberId`, `serviceCode` fields and their `@relation`s; drop them
  from `@@id([...])`; add `remarks String? @map("remarks")`.
- Add a new `BphSaleItem` model mapped to `@@map("bph_sales_item")`, with relations to
  `BphSale` (via `transactionId`), `BphService`, and `BphBarber`, and
  `@@id([transactionId, itemNumber])`.
- Add the reverse relation array (`items BphSaleItem[]`) on `BphSale`, and reverse relation
  arrays on `BphService`/`BphBarber` for sale items (alongside their existing `sales BphSale[]` —
  check whether `sales BphSale[]` on `BphBarber`/`BphService` still makes sense once the FK moves,
  or whether it should be removed/replaced by the items relation).
- Generate a new migration (`prisma migrate dev` or write SQL by hand matching the existing
  migrations in `prisma/migrations/`) — check `prisma/migrations/` for the naming convention
  already in use.

### 1d. Raw SQL + pgtyped (`src/queries/sales/`)
- `sales.sql` / `sales.queries.ts`: remove `barber_id`, `service_code` from `CreateSale`,
  `UpdateSale`, `DeleteSale` (including from the composite `WHERE` clauses — those queries
  currently key off `transaction_id + transaction_date + customer_id + branch_id + barber_id +
  service_code`, which must shrink now that `barber_id`/`service_code` aren't on this table).
  Add `remarks` to `CreateSale`/`UpdateSale`.
- `GetSalesByBarber` and `GetSalesByPaymentMethod`-style per-barber/per-service lookups
  (`src/controllers/sales.ts` `getSalesByBarber`) currently filter `bph_sales` directly on
  `barber_id`. That column won't exist anymore — rewrite as a join through `bph_sales_item`
  (e.g. `SELECT s.* FROM bph_sales s JOIN bph_sales_item i ON i.transaction_id = s.transaction_id
  WHERE i.barber_id = :barber_id`), or decide the endpoint should return line items instead of
  headers — your call, but keep the route/contract behavior sane and document the decision.
- Create a new `src/queries/sales/sales_item.sql` (or similarly named) with CRUD queries for
  `bph_sales_item`: create/list-by-transaction/update/delete, following the exact style of the
  existing `.sql` files (see `src/queries/barbers/barbers.sql` for the pattern). Run the pgtyped
  codegen (check for a `pgtyped` CLI invocation — there's no npm script for it currently, use
  `npx pgtyped -c pgtyped.config.json`; it needs a reachable Postgres per `dbUrl` in
  `pgtyped.config.json`, so if the DB isn't up, hand-write the `.queries.ts` output matching the
  exact shape pgtyped produces elsewhere, e.g. `src/queries/barbers/barbers.queries.ts`).

### 1e. Controllers & routes
- `src/controllers/sales.ts`: `createSale`/`updateSale` request bodies lose `barberId`/
  `serviceCode`, gain `remarks`. Decide whether `createSale` should accept a nested array of
  line items in the same request (recommended, since a sale without any items isn't meaningful)
  or whether sale items are created via a separate endpoint — check how `src/controllers/checkout.ts`
  (POS checkout flow) currently creates a sale, since that flow is the main caller and will need
  to populate `bph_sales_item` too.
- Add a new controller (or extend `sales.ts`) + `src/routes/salesRoute.ts` entries for
  `bph_sales_item` CRUD (create/list-by-transaction/update/delete), mirroring the existing
  resource-route conventions in `src/routes/`.
- Grep the whole `src/` tree for `barber_id`/`barberId`/`service_code`/`serviceCode` scoped to
  sales-related code to catch anything not listed above (e.g. `src/controllers/helper/listQueryDefinitions.ts`
  likely has a `sales` list-query definition with filterable/sortable columns that references
  these fields).

### 1f. Tests
- `test/sales.test.ts`: update fixtures/payloads to drop `barberId`/`serviceCode` from sale
  creation, add `remarks`, and add new test coverage for the `bph_sales_item` endpoints
  (create item(s) for a transaction, list items by transaction, update, delete, and the
  cleanup in `afterAll`). Update the "should return 400 for missing required fields" case if the
  required-field set changed.
- `test/checkout.test.ts`: the POS checkout flow likely creates a `bph_sales` row — check
  whether it needs updating to also produce a `bph_sales_item` row, and whether its assertions
  reference `barberId`/`serviceCode` on the sale object.
- `test/http/sales_test.http`: update the `POST`/`PUT` sample bodies (drop `barberId`/
  `serviceCode`, add `remarks`), add new request blocks for `bph_sales_item` CRUD, and update
  `GET /sales/barber/:barberId` if its implementation now goes through a join.

---

## 2. `bph_services_cost` — inventory-only costing + multiplier + stock status

**What changed:**
- `cost_category` is no longer part of the primary key (was `Yes` under Key Field, now `No`).
  New composite PK is `(service_code, item_number, cost_id)` — **this is a real structural
  change found only via the diff; it was not yellow-highlighted in the workbook.**
- `cost_id` and `cost_category` descriptions both now say "10/03 - always from the
  _inventory" / "always from product/inventory" — the old "or Barber Effort, fixed dropdown"
  alternative is gone. `cost_id` is always a FK into `bph_inventory` now (this already matches
  how `BphServiceCost.inventoryItem` is modeled in Prisma today, so mainly confirm nothing in
  the create/update logic still allows a non-inventory `cost_id`).
- New field `multiplier` — Integer, nullable. "multiply cost_amount depending on the service
  code created (e.g. a long-hair service consumes more product than the base consumable
  config, without changing the core amount/consumable configured)."
- Virtual field `cost_amount`'s source changed from `_inventory.stock_cost` to
  `_inventory.unit_cost` — **also not highlighted, found only via diff.** If any existing
  reporting/analytics logic computes `cost_amount` from `stock_cost`, it needs to switch to
  `unit_cost`.
- Two new virtual (computed, not stored) fields: `minimum_qty` (from
  `bph_inventory.miniumum_stock`) and `status` (e.g. `LOW_STOCK` when current quantity is below
  `minimum_qty`).

### Changes to make
- `prisma/models/dashboard_model.prisma` → `BphServiceCost`: add `multiplier Int? @map("multiplier")`;
  change `@@id([serviceCode, itemNumber, costCategory, costId])` to
  `@@id([serviceCode, itemNumber, costId])`.
- Migration for the new column + PK change.
- `src/queries/services/services_cost.sql`: add `multiplier` to `CreateServiceCost` and
  `UpdateServiceCost`; `UpdateServiceCost`/`DeleteServiceCost` currently key only on
  `service_code + item_number` already (not `cost_category`), so check whether those WHERE
  clauses need to start including `cost_id` now that it's part of the PK, to stay unambiguous.
  Consider adding a query that computes `minimum_qty`/`status` via a join to `bph_inventory`
  (e.g. `SELECT sc.*, i.miniumum_stock AS minimum_qty, CASE WHEN ... THEN 'LOW_STOCK' ELSE 'OK' END AS status FROM bph_services_cost sc JOIN bph_inventory i ON i.product_id = sc.cost_id ...`) —
  there's currently no stock-on-hand/current-quantity column anywhere in the schema, so you'll
  need to figure out what "current quantity" means given the existing `bph_inventory_trail`
  movement-log table, or flag that gap back to me (see Section 5).
- **Note:** `services_cost.queries.ts` exists but is currently not wired into any controller or
  route (`src/controllers/services.ts` has no cost-related handlers, and there's no
  `services_cost` route). Decide whether to wire it up as part of this change (it seems
  necessary if `multiplier`/`status` need to be exposed via the API) or leave it unwired and
  just keep the query layer correct — flag which you chose.
- Tests/`.http`: there is currently no `test/*.test.ts` or `test/http/*.http` file for services
  cost at all. If you wire up the controller/routes, add `test/services_cost.test.ts` and
  `test/http/services_cost_test.http` following the conventions in `test/services.test.ts` /
  `test/http/services_test.http`.

---

## 3. `bph_barbers` — availability + multi-branch

**What changed (all additive, all new — this table had no "Virtual Fields" or "Association"
section documented at all before this revision):**
- New field `date_availability` — String, nullable, "comma separated days (01, 02)".
- New virtual field `_branches.branch_id` (rollup from associated branch(es)).
- New association `_branches` described as `(1..n)` — **one barber associated with many
  branches.** Today `BphBarber.branchId` is a single nullable FK (`branchId String? @map("branch_id")`),
  i.e. many-barbers-to-one-branch. A `(1..n)` from the barber's side is the opposite direction:
  a barber can now work across multiple branches, which is a many-to-many relationship overall.

### Changes to make
- `prisma/models/dashboard_model.prisma` → `BphBarber`: add
  `dateAvailability String? @map("date_availability")`.
- For the branch relationship: this is flagged in Section 5 as needing your confirmation before
  implementing, because it changes cardinality on a column other tables' composite logic may
  assume is single-valued. My recommendation if you need to proceed without waiting: introduce
  an explicit join table (e.g. `BphBarberBranch` with `barberId`/`branchId`, mapped to a new
  table like `bph_barber_branches`) rather than an implicit Prisma many-to-many, migrate
  existing `bph_barbers.branch_id` values into it as seed rows, and keep the old `branch_id`
  column for now (don't drop it in the same change) to avoid a breaking change for
  `getBarbersByBranch` and anything else that reads it directly — then update
  `getBarbersByBranch` to query through the join table.
- `src/queries/barbers/barbers.sql`: add `date_availability` to `CreateBarber`/`UpdateBarber`/
  the `SELECT` results. If you implement the join table, add new queries for
  assigning/unassigning a barber to a branch and listing branches for a barber.
- Tests/`.http`: `test/barbers.test.ts` and `test/http/barbers_test.http` — add
  `dateAvailability` to create/update payloads and assertions; add coverage for the new
  branch-association behavior if implemented.

---

## 4. Small additive changes (low risk, no ambiguity)

- **`bph_customers`**: new field `company` — String, nullable. **Not highlighted at all in the
  workbook — found only via diff against the prior version.**
  - `prisma/models/dashboard_model.prisma` → `BphCustomer`: add `company String? @map("company")`.
  - `src/queries/customers/customers.sql`: add `company` to `CreateCustomer`/`UpdateCustomer`.
  - `src/controllers/customers.ts`, `test/customers.test.ts`,
    `test/http/customers_test.http`: add `company` to payloads/assertions.

---

## 5. Flag back to me — do not guess silently on these

1. **Barber ↔ Branch cardinality** (Section 3): confirm a barber should really be assignable to
   multiple branches before implementing the join-table change — this affects seed data,
   existing `branch_id`-based queries, and POS slot/queue assignment logic that currently
   assumes one branch per barber.
2. **`pos_queue.appointment_date` data type**: in the revised workbook this cell's Data Type was
   changed from `String` to `Integer`, but the field description still reads "use booknetic
   appointment date" and the `Remarks` column is unchanged — this looks like an accidental edit
   in the spreadsheet, not an intentional type change. **Do not change `PosQueue.appointmentDate`
   to an Int** without confirming; leave it as-is and just flag it.
3. **`bph_services_cost.status`/`minimum_qty` "current quantity" source**: there's no
   stock-on-hand column in `bph_inventory` today (only `initial_stock`, `miniumum_stock`, etc.)
   — confirm whether "current quantity" should be computed by netting `bph_inventory_trail`
   movements against `initial_stock`, or whether a new running-balance column is expected.
4. Whether to wire up `bph_services_cost` into a controller/route now (it's currently dead code
   at the query layer) — see Section 2.
5. The empty `v_top_services` sheet in the workbook has no fields defined yet — no action
   needed this round, just don't be surprised it exists.

---

## General execution notes
- Follow the existing code style exactly (pgtyped `.sql` formatting, controller
  try/finally-with-`pool.connect()` pattern, route file conventions, vitest `describe`/`it`
  structure with an authenticated agent via `test/helpers/authenticatedAgent.ts`).
- Run `npm run type-check`, `npm run lint`, and `npm run test:run` after each section and fix
  anything that breaks before moving to the next section.
- Keep each of the 4 sections above as a separate, reviewable commit/diff rather than one giant
  change.

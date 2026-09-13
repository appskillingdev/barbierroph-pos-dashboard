import type { ListQueryDefinition } from "./sqlQueryHandler.js";

const columns = (...names: string[]) =>
  Object.fromEntries(names.map((name) => [name, name]));

export const listQueries = {
  users: {
    table: "bph_users",
    columns: columns(
      "ID",
      "user_id",
      "email_address",
      "full_name",
      "user_type",
      "contact_number",
      "created_at",
    ),
    defaultSort: "created_at",
    defaultOrder: "desc",
  },
  barbers: {
    table: "bph_barbers",
    columns: columns(
      "barber_id",
      "branch_id",
      "position",
      "full_name",
      "address",
      "commission",
      "email_address",
    ),
    defaultSort: "full_name",
  },
  branches: {
    table: "bph_branches",
    columns: columns(
      "branch_id",
      "branch_owner",
      "established_at",
      "branch_location",
      "branch_address",
    ),
    defaultSort: "branch_location",
  },
  checkouts: {
    table: "pos_checkout",
    columns: columns(
      "id",
      "customer_name",
      "assigned_branch",
      "assigned_barber",
      "service_code",
      "amount",
      "payment_method",
      "purchased_at",
      "reference_number",
    ),
    defaultSort: "purchased_at",
    defaultOrder: "desc",
  },
  customers: {
    table: "bph_customers",
    columns: columns(
      "customer_id",
      "customer_name",
      "customer_address",
      "contact_number",
      "email_address",
      "visit_count",
    ),
    defaultSort: "customer_name",
  },
  inventory: {
    table: "bph_inventory",
    columns: columns(
      "product_id",
      "category",
      "product_name",
      "initial_stock",
      "miniumum_stock",
      "unit_cost",
      "stock_price",
    ),
    defaultSort: "product_name",
  },
  paymentMethods: {
    table: "bph_paymentmethods",
    columns: columns("payment_method_id", "payment_method_name", "bank_number"),
    defaultSort: "payment_method_name",
  },
  queue: {
    table: "pos_queue",
    columns: columns(
      "id",
      "customer_name",
      "assigned_branch",
      "assigned_barber",
      "service_code",
      "status",
      "appointment_date",
    ),
    defaultSort: "appointment_date",
  },
  sales: {
    table: "bph_sales",
    columns: columns(
      "transaction_id",
      "transaction_date",
      "customer_id",
      "branch_id",
      "barber_id",
      "service_code",
      "total_amount",
      "payment_method",
      "reference_no",
      "created_by",
    ),
    defaultSort: "transaction_date",
    defaultOrder: "desc",
  },
  services: {
    table: "bph_services",
    columns: columns(
      "service_code",
      "category",
      "cluster",
      "service_name",
      "service_description",
      "service_amount",
      "is_promo",
    ),
    defaultSort: "service_name",
  },
  slots: {
    table: "pos_slots",
    columns: columns("id", "branch_id", "slot_id", "assigned_barber", "status"),
    defaultSort: "slot_id",
  },
} satisfies Record<string, ListQueryDefinition>;

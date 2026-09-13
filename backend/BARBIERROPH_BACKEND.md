# Barbierro Backend

The Barbierro backend is the REST API and data layer shared by the two
Barbierro frontend applications:

- **BBPos** - the point-of-sale application used for checkout, queues, slots,
  customers, services, and sales.
- **BBSuite** - the management dashboard used for branches, barbers,
  inventory, users, services, and analytics.

This service provides the API consumed by both applications, connects to the
PostgreSQL database, manages sessions, and enforces role-based permissions.

## Quick Start

Run these commands from the `backend` directory. Docker Desktop must be
installed and running.

```bash
npm i
npm run setup-docker
npx prisma migrate dev
npm run seed
npm run dev
```

Create `backend/.env` before running the migrations:

```env
DATABASE_URL=postgresql://admin:admin@localhost:5432/mydb
BB_POS_URL=http://localhost:5173
BB_SUITE_URL=http://localhost:5174
SESSION_SECRET=barbierro-secret-key-change-in-production
```

The API runs at `http://localhost:3000` and uses the `/api` prefix. For
example, the login endpoint is `POST /api/auth/login`.

## Applications and API Responsibilities

The backend is shared by BBPos and BBSuite. Authentication is session-based,
and protected endpoints require a successful login.

| Area               | Main use                                            | Frontend          |
| ------------------ | --------------------------------------------------- | ----------------- |
| Auth and users     | Login, sessions, users, and permissions             | BBPos and BBSuite |
| Checkout and sales | Checkout, payment methods, sales, queues, and slots | BBPos             |
| Operations         | Customers, services, barbers, and branches          | BBPos and BBSuite |
| Management         | Inventory and analytics-related data                | BBSuite           |

User types are:

- **P01 Master** - full system access.
- **P02 Branch Manager** - branch-level management.
- **P03 Cashier** - point-of-sale operations.

## Documentation Dictionary

These are the Markdown documents in the backend root. Start with this file,
then open the document that matches the task.

| Document                          | Purpose                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `BARBIERROPH_BACKEND.md`          | Backend introduction, quick start, architecture, and documentation index.                         |
| `API_DOCUMENTATION.md`            | REST API endpoint reference and backend project structure.                                        |
| `AUTH_DOCUMENTATION.md`           | Authentication endpoints, sessions, roles, and permissions.                                       |
| `AUTHORIZATION_IMPLEMENTATION.md` | Route protection matrix and authorization middleware implementation details.                      |
| `IMPLEMENTATION_SUMMARY.md`       | Summary of the authentication, authorization, CORS, database seed, and test implementation.       |
| `TEST_CREDENTIALS.md`             | Seeded user accounts and credentials for local testing.                                           |
| `TEST_TUTORIAL.MD`                | Vitest commands and manual `.http` testing instructions. It requires this document's setup first. |

## Testing

Use [`TEST_TUTORIAL.MD`](TEST_TUTORIAL.MD) for automated and manual testing.
It covers complete Vitest runs, individual files, line-specific runs, test
name filters, coverage, and the REST Client workflow for `test/http`.

For manual HTTP testing, run `test/http/auth_test.http` first so the
authentication and session flow is established before testing protected API
routes.

## Common Commands

```bash
npm run dev          # Start the development server
npm run test         # Run Vitest in watch mode
npm run test:run     # Run all tests once
npm run coverage     # Generate test coverage
npm run type-check   # Check TypeScript types
npm run lint         # Run ESLint
```

## Project Map

```text
backend/
├── prisma/          Database schema, migrations, and seed data
├── src/controllers/ Request handling and business logic
├── src/queries/     SQL queries and generated PGTyped types
├── src/routes/      API route definitions
├── test/             Automated Vitest tests and manual HTTP requests
└── *.md             Backend documentation
```

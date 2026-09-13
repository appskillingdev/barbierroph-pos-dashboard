# Testing Tutorial

This document explains how to run the automated Vitest tests and how to run the
manual HTTP tests in `test/http`.

## Prerequisites

Complete the [backend setup](BARBIERROPH_BACKEND.md#quick-start) first. It
covers Docker, dependency installation, the `.env` file, database migrations,
and seed data. Run the commands below from the `backend` directory.

## Automated Tests with Vitest

Vitest tests are located in `test`. The tests use the database, so complete the
prerequisites above before running them.

### Run all tests in watch mode

```bash
npm run test
```

Vitest stays open and reruns tests when files change. Press `q` to quit.

### Run the complete test suite once

```bash
npm run test:run
```

This is the recommended command for CI or a final local verification.

### Run one test file

Pass the test file after `--`:

```bash
npm run test:run -- test/auth.test.ts
```

For example, to run the customer tests:

```bash
npm run test:run -- test/customers.test.ts
```

### Run a test at a specific line

Append the line number to the test file path. Use the line containing the
`describe` or `it` block you want to run:

```bash
npm run test:run -- test/auth.test.ts:58
```

### Run tests by name

Use `-t` followed by part or all of the `describe`/`it` name:

```bash
npm run test:run -- test/auth.test.ts -t "login with valid credentials"
```

### Optional test commands

```bash
npm run test:ui       # Open the Vitest UI
npm run coverage      # Generate a coverage report
npm run type-check    # Check TypeScript types
```

## Manual HTTP Tests

The manual requests are in `test/http`. Install the **REST Client** extension
in VS Code (the REST API request extension) to run `.http` files directly from
the editor.

Before sending requests, start the backend in a separate terminal:

```bash
npm run dev
```

The requests use `http://localhost:3000/api` as their base URL.

### Required order

Run `test/http/auth_test.http` first. It establishes and verifies the
authentication/session flow. After that file completes, run the remaining HTTP
files in any order:

1. `barbers_test.http`
2. `branches_test.http`
3. `checkout_test.http`
4. `customers_test.http`
5. `inventory_test.http`
6. `paymentmethods_test.http`
7. `queue_test.http`
8. `sales_test.http`
9. `services_test.http`
10. `slots_test.http`
11. `users_test.http`

To run a request, open the `.http` file in VS Code and select **Send Request**
above the request. Review the response status and body before continuing.

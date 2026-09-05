# Barbierro Backend API Documentation

## Overview

Complete RESTful API with CRUD operations for all database tables using PGTyped for type-safe SQL queries.

## Project Structure

```
backend/src/
├── queries/                    # SQL queries organized by context
│   ├── sales/
│   │   ├── sales.sql
│   │   └── sales.queries.ts   # Generated TypeScript types
│   ├── services/
│   │   ├── services.sql
│   │   ├── services.queries.ts
│   │   ├── services_cost.sql
│   │   └── services_cost.queries.ts
│   ├── branches/
│   │   ├── branches.sql
│   │   └── branches.queries.ts
│   ├── users/
│   │   ├── users.sql
│   │   └── users.queries.ts
│   ├── barbers/
│   │   ├── barbers.sql
│   │   └── barbers.queries.ts
│   ├── inventory/
│   │   ├── inventory.sql
│   │   ├── inventory.queries.ts
│   │   ├── inventory_category.sql
│   │   ├── inventory_category.queries.ts
│   │   ├── inventory_trail.sql
│   │   └── inventory_trail.queries.ts
│   ├── paymentmethods/
│   │   ├── paymentmethods.sql
│   │   └── paymentmethods.queries.ts
│   ├── customers/
│   │   ├── customers.sql
│   │   └── customers.queries.ts
│   └── pos/
│       ├── checkout.sql
│       ├── checkout.queries.ts
│       ├── queue.sql
│       ├── queue.queries.ts
│       ├── slots.sql
│       └── slots.queries.ts
├── controllers/               # Business logic
│   ├── sales.ts
│   ├── services.ts
│   ├── branches.ts
│   ├── users.ts
│   ├── barbers.ts
│   ├── inventory.ts
│   ├── customers.ts
│   ├── paymentmethods.ts
│   ├── checkout.ts
│   ├── queue.ts
│   └── slots.ts
└── routes/                   # API endpoints
    ├── salesRoute.ts
    ├── servicesRoute.ts
    ├── branchesRoute.ts
    ├── usersRoute.ts
    ├── barbersRoute.ts
    ├── inventoryRoute.ts
    ├── customersRoute.ts
    ├── paymentMethodsRoute.ts
    ├── checkoutRoute.ts
    ├── queueRoute.ts
    └── slotsRoute.ts
```

## API Endpoints

### 📊 Sales (`/sales`)

- `POST /sales` - Create new sale
- `GET /sales` - Get all sales (latest first)
- `GET /sales/date-range?startDate=&endDate=` - Get sales by date range
- `GET /sales/customer/:customerId` - Get sales by customer
- `GET /sales/branch/:branchId` - Get sales by branch
- `GET /sales/barber/:barberId` - Get sales by barber
- `GET /sales/payment-method/:paymentMethod` - Get sales by payment method
- `GET /sales/:transactionId` - Get sale by transaction ID
- `PUT /sales` - Update sale (requires composite key in body)
- `DELETE /sales` - Delete sale (requires composite key in body)

### 🛠️ Services (`/services`)

- `POST /services` - Create new service
- `GET /services` - Get all services
- `GET /services/promos` - Get promo services
- `GET /services/category/:category` - Get services by category
- `GET /services/:serviceCode` - Get service by code
- `PUT /services/:serviceCode` - Update service
- `DELETE /services/:serviceCode` - Delete service

### 🏢 Branches (`/branches`)

- `POST /branches` - Create new branch
- `GET /branches` - Get all branches
- `GET /branches/owner/:ownerId` - Get branches by owner
- `GET /branches/location/:location` - Get branches by location
- `GET /branches/:branchId` - Get branch by ID
- `PUT /branches/:branchId` - Update branch
- `DELETE /branches/:branchId` - Delete branch

### 👥 Users (`/users`)

- `POST /users` - Create new user
- `GET /users` - Get all users
- `GET /users/email/:email` - Get user by email
- `GET /users/userId/:userId` - Get user by user ID
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `PATCH /users/:id/password` - Update user password
- `DELETE /users/:id` - Delete user

### ✂️ Barbers (`/barbers`)

- `POST /barbers` - Create new barber
- `GET /barbers` - Get all barbers
- `GET /barbers/branch/:branchId` - Get barbers by branch
- `GET /barbers/position/:position` - Get barbers by position
- `GET /barbers/:barberId` - Get barber by ID
- `PUT /barbers/:barberId` - Update barber
- `DELETE /barbers/:barberId` - Delete barber

### 📦 Inventory (`/inventory`)

- `POST /inventory` - Create new inventory item
- `GET /inventory` - Get all inventory items
- `GET /inventory/low-stock` - Get low stock items
- `GET /inventory/category/:category` - Get items by category
- `GET /inventory/:productId` - Get inventory item by ID
- `PUT /inventory/:productId` - Update inventory item
- `PATCH /inventory/:productId/stock` - Update inventory stock
- `DELETE /inventory/:productId` - Delete inventory item

### 👤 Customers (`/customers`)

- `POST /customers` - Create new customer
- `GET /customers` - Get all customers
- `GET /customers/top?limit=10` - Get top customers by visit count
- `GET /customers/name/:name` - Search customers by name
- `GET /customers/:customerId` - Get customer by ID
- `PUT /customers/:customerId` - Update customer
- `PATCH /customers/:customerId/visit` - Increment customer visit count
- `DELETE /customers/:customerId` - Delete customer

### 💳 Payment Methods (`/payment-methods`)

- `POST /payment-methods` - Create new payment method
- `GET /payment-methods` - Get all payment methods
- `GET /payment-methods/name/:name` - Get payment method by name
- `GET /payment-methods/:paymentMethodId` - Get payment method by ID
- `PUT /payment-methods/:paymentMethodId` - Update payment method
- `DELETE /payment-methods/:paymentMethodId` - Delete payment method

### 🛒 POS - Checkout (`/checkout`)

- `POST /checkout` - Create new checkout
- `GET /checkout` - Get all checkouts
- `GET /checkout/date-range?startDate=&endDate=` - Get checkouts by date range
- `GET /checkout/branch/:branchId` - Get checkouts by branch
- `GET /checkout/barber/:barberId` - Get checkouts by barber
- `GET /checkout/customer/:name` - Search checkouts by customer name
- `GET /checkout/:id` - Get checkout by ID
- `PUT /checkout/:id` - Update checkout
- `DELETE /checkout/:id` - Delete checkout

### 📋 POS - Queue (`/queue`)

- `POST /queue` - Create new queue entry
- `GET /queue` - Get all queue entries
- `GET /queue/status/:status` - Get queue entries by status
- `GET /queue/branch/:branchId` - Get queue entries by branch
- `GET /queue/barber/:barberId` - Get queue entries by barber
- `GET /queue/customer/:name` - Search queue by customer name
- `GET /queue/:id` - Get queue entry by ID
- `PUT /queue/:id` - Update queue entry
- `PATCH /queue/:id/status` - Update queue entry status
- `DELETE /queue/:id` - Delete queue entry

### 🎫 POS - Slots (`/slots`)

- `POST /slots` - Create new slot
- `GET /slots` - Get all slots
- `GET /slots/status/:status` - Get slots by status
- `GET /slots/branch/:branchId/available` - Get available slots by branch
- `GET /slots/branch/:branchId` - Get slots by branch
- `GET /slots/barber/:barberId` - Get slots by barber
- `GET /slots/:id` - Get slot by ID
- `PUT /slots/:id` - Update slot
- `PATCH /slots/:id/status` - Update slot status
- `DELETE /slots/:id` - Delete slot

## PGTyped Configuration

The project uses PGTyped for type-safe SQL queries:

**Configuration:** `backend/pgtyped.config.json`

```json
{
  "transforms": [
    {
      "mode": "sql",
      "include": "**/*.sql",
      "emitTemplate": "{{dir}}/{{name}}.queries.ts"
    }
  ],
  "srcDir": "./src/queries",
  "failOnError": false,
  "camelCaseColumnNames": false,
  "dbUrl": "postgres://admin:admin@localhost:5432/mydb"
}
```

**Generate Types:** Run `npx pgtyped -w -c pgtyped.config.json` to watch for SQL changes and regenerate TypeScript types automatically.

## Development Workflow

1. **Add new SQL query**: Edit or create `.sql` files in appropriate `queries/` subfolder
2. **Generate types**: PGTyped watch mode auto-generates `.queries.ts` files
3. **Create controller**: Implement business logic using generated typed queries
4. **Create route**: Define REST endpoints following the existing pattern
5. **Register route**: Add to `createRoutes.ts`

## Notes

- All queries use parameterized statements for SQL injection prevention
- TypeScript types are auto-generated from SQL queries
- All controllers follow consistent error handling pattern with try/finally blocks
- Database client connections are properly released after each query

---
name: createAuthHandling
description: Generate Auth handling for BBPos/BBSuite. The phase 1 scope should only handle username and passwords.
---

# API Routes

I created auth handling in /index.ts. You decide which is best practice if we create a auth handling inside index.ts, or inside the middleware that I already created. Create for login and logout Ex. /auth/login, /auth/logout. Add temporary comment inside that redirects to html page(ill do that soon once our FE developer finishes his part)

# CORS

Enable CORS, and only allow the POS and dashboard (add placeholder host for that). Use .env variables for the url's.

POS: process.env.BB_POS_URL
Dashboard: process.env.BB_SUITE_URL

# Authorization

Only allow CRUD depending user types. The user types are:

Cashier (P03)
Branch Manager (P02)
Master (P01)

Privileges:
| Scenario | P01 | P02 | P03 |
| Can send sales data once checked out | Yes | Yes | Yes |
| Can CRUD barbers per branches/specific branches | Yes | Yes | No |
| Can view analytics | Yes | Yes | No |
| Can remove/create new branches and branch owners | Yes | No | No |
| Can re-stock inventories | Yes | No | No |
| Can check other branches | Yes | No | No |
| Can CUD services | Yes | No | No |
| Can view services | Yes | Yes | Yes |
| Can view queued customers | Yes | Yes | Yes |
... That for now ill create auth manually for other scenarios
Create the auth handling under /src/controllers/helper folder and name it authorizationHandler.ts
Update the vitest for users to handle auth scenarios as well.

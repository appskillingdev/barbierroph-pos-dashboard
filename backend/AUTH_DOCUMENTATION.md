# Authentication & Authorization System

## Overview

The Barbierro API now includes a complete authentication and authorization system with role-based access control (RBAC) for BBPos and BBSuite applications.

## Features

- **Session-based authentication** using express-session
- **Password hashing** with bcrypt
- **CORS protection** for specific frontend origins
- **Role-based authorization** (Master, Branch Manager, Cashier)
- **TypeScript type safety** for session and user data

## Authentication Endpoints

### POST /api/auth/login

Login with email and password.

**Request:**

```json
{
  "email": "user@barbierro.com",
  "password": "yourpassword"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user001",
    "userId": "owner001",
    "email": "owner1@barbierro.com",
    "fullName": "Juan Dela Cruz",
    "userType": "P01"
  }
}
```

### POST /api/auth/logout

Logout and destroy session. Requires authentication.

**Response:**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /api/auth/session

Check current session status.

**Response (Authenticated):**

```json
{
  "authenticated": true,
  "user": {
    "id": "user001",
    "userId": "owner001",
    "email": "owner1@barbierro.com",
    "fullName": "Juan Dela Cruz",
    "userType": "P01"
  }
}
```

## User Types & Permissions

### P01 - Master

**Full system access**

- ✅ Send sales data
- ✅ CRUD barbers per branches
- ✅ View analytics
- ✅ Remove/create new branches and branch owners
- ✅ Re-stock inventories
- ✅ Check other branches
- ✅ CUD services
- ✅ View services
- ✅ View queued customers

### P02 - Branch Manager

**Branch-level management**

- ✅ Send sales data
- ✅ CRUD barbers per branches (own branches only)
- ✅ View analytics
- ❌ Cannot manage branches
- ❌ Cannot re-stock inventories
- ❌ Cannot check other branches
- ❌ Cannot CUD services
- ✅ View services
- ✅ View queued customers

### P03 - Cashier

**Point-of-sale operations only**

- ✅ Send sales data
- ❌ Cannot CRUD barbers
- ❌ Cannot view analytics
- ❌ Cannot manage branches
- ❌ Cannot re-stock inventories
- ❌ Cannot check other branches
- ❌ Cannot CUD services
- ✅ View services
- ✅ View queued customers

## Using Authorization Middleware

### Protect Routes with Authentication

```typescript
import { requireAuth } from "./controllers/helper/authorizationHandler.js";

app.get("/api/protected-route", requireAuth, (req, res) => {
  // Only authenticated users can access this
  res.json({ user: req.user });
});
```

### Protect Routes by User Type

```typescript
import {
  requireUserType,
  UserType,
} from "./controllers/helper/authorizationHandler.js";

// Only Master users
app.post(
  "/api/branches",
  requireAuth,
  requireUserType(UserType.MASTER),
  createBranch,
);

// Master or Branch Manager
app.post(
  "/api/barbers",
  requireAuth,
  requireUserType(UserType.MASTER, UserType.BRANCH_MANAGER),
  createBarber,
);
```

### Protect Routes by Permission

```typescript
import { requirePermission } from "./controllers/helper/authorizationHandler.js";

// Only users who can manage inventory
app.post(
  "/api/inventory/restock",
  requireAuth,
  requirePermission("canRestockInventory"),
  restockInventory,
);

// Only users who can view analytics
app.get(
  "/api/analytics",
  requireAuth,
  requirePermission("canViewAnalytics"),
  getAnalytics,
);
```

## CORS Configuration

The API is configured to only accept requests from:

- **BBPos Frontend:** Defined in `BB_POS_URL` environment variable
- **BBSuite Dashboard:** Defined in `BB_SUITE_URL` environment variable

Default values (for development):

- `BB_POS_URL=http://localhost:5173`
- `BB_SUITE_URL=http://localhost:5174`

## Environment Variables

Required in `.env` file:

```env
# Database
DATABASE_URL=postgresql://admin:admin@localhost:5432/mydb

# Frontend URLs for CORS
BB_POS_URL=http://localhost:5173
BB_SUITE_URL=http://localhost:5174

# Session secret (CHANGE IN PRODUCTION!)
SESSION_SECRET=barbierro-secret-key-change-in-production
```

## Testing

Run authentication tests:

```bash
npm test auth.test.ts
```

Test scenarios include:

- Login with valid/invalid credentials
- Session management
- Logout functionality
- Role-based authorization
- Permission checks for different user types

## Frontend Integration

### Login Flow

1. Send POST request to `/api/auth/login`
2. Store session cookie (automatically handled by browsers)
3. Include credentials in all subsequent requests
4. Check session status on app load with `/api/auth/session`

### Example (Fetch API):

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Important for cookies
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Check session
const checkSession = async () => {
  const response = await fetch("http://localhost:3000/api/auth/session", {
    credentials: "include",
  });
  return response.json();
};

// Logout
const logout = async () => {
  const response = await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};
```

## Security Notes

⚠️ **Important for Production:**

1. **Change SESSION_SECRET** to a strong random value
2. **Use HTTPS** in production (secure cookies)
3. **Update CORS origins** to production URLs
4. **Implement rate limiting** for login attempts
5. **Add password complexity requirements**
6. **Consider adding JWT tokens** for API-only clients
7. **Implement refresh token mechanism** for long sessions
8. **Add account lockout** after failed login attempts

## Next Steps

- [ ] Add password reset functionality
- [ ] Implement email verification
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Add audit logging for sensitive operations
- [ ] Implement OAuth/Social login
- [ ] Add API rate limiting

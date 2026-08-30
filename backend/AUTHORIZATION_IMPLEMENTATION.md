# Authorization Middleware Implementation

## ✅ What Changed

### All API routes now require authentication!

Previously: All routes were publicly accessible  
**Now: All routes except `/api/auth/*` require a valid session**

## Route Protection Matrix

| Route                  | Required Auth | Additional Permissions                                        |
| ---------------------- | ------------- | ------------------------------------------------------------- |
| `/api/auth/*`          | ❌ Public     | None (login/logout)                                           |
| `/api/sales`           | ✅ Required   | `canSendSalesData` (P01, P02, P03)                            |
| `/api/services`        | ✅ Required   | GET: All users / POST/PUT/DELETE: `canCUDServices` (P01 only) |
| `/api/branches`        | ✅ Required   | `canManageBranches` (P01 only)                                |
| `/api/users`           | ✅ Required   | P01 (Master) only                                             |
| `/api/barbers`         | ✅ Required   | `canCRUDBarbers` (P01, P02)                                   |
| `/api/inventory`       | ✅ Required   | `canRestockInventory` (P01 only)                              |
| `/api/customers`       | ✅ Required   | All authenticated users                                       |
| `/api/payment-methods` | ✅ Required   | All authenticated users                                       |
| `/api/checkout`        | ✅ Required   | All authenticated users                                       |
| `/api/queue`           | ✅ Required   | `canViewQueue` (P01, P02, P03)                                |
| `/api/slots`           | ✅ Required   | All authenticated users                                       |

## Implementation Details

### 1. Global Authentication

All routes under `/api` (except `/api/auth`) now have `requireAuth` middleware applied in [apiRoutes.ts](src/apiRoutes.ts).

### 2. Route-Level Authorization

Specific routes have additional permission checks:

- **Branches**: Only Masters (P01) can manage
- **Users**: Only Masters (P01) can CRUD
- **Barbers**: Masters and Branch Managers (P01, P02) can CRUD
- **Inventory**: Only Masters (P01) can restock
- **Sales**: All authenticated users (P01, P02, P03)

### 3. Method-Level Authorization

Services route has granular control in [servicesRoute.ts](src/routes/servicesRoute.ts):

- **GET** (view): All authenticated users
- **POST/PUT/DELETE** (CUD): Only Masters (P01)

## Testing Authentication

### Without Session (Unauthenticated):

```bash
# Should return 401 Unauthorized
GET http://localhost:3000/api/users
```

Response:

```json
{
  "error": "Unauthorized: Please login"
}
```

### With Session (After Login):

```bash
# 1. Login first
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "owner1@barbierro.com",
  "password": "Password123!"
}

# 2. Then access protected routes (cookies sent automatically)
GET http://localhost:3000/api/users
```

### Testing Authorization (Wrong User Type):

```bash
# Login as Cashier (P03)
POST http://localhost:3000/api/auth/login
{
  "email": "cashier4@barbierro.com",
  "password": "Password123!"
}

# Try to access branches (requires P01)
GET http://localhost:3000/api/branches
```

Response:

```json
{
  "error": "Forbidden: Insufficient permissions",
  "required": "canManageBranches",
  "userType": "P03"
}
```

## Files Modified

1. **[apiRoutes.ts](src/apiRoutes.ts)**
   - Added `requireAuth` middleware to all protected routes
   - Added permission checks for specific routes
   - Imported authorization functions

2. **[servicesRoute.ts](src/routes/servicesRoute.ts)**
   - Added method-level permission checks
   - GET methods: All authenticated users
   - POST/PUT/DELETE: Only P01 (Masters)

3. **[auth.ts](src/controllers/auth.ts)**
   - Fixed `user_type` field mapping
   - Changed from `user.userType` to `user.user_type`

## Security Impact

🔒 **Before:**

- Anyone could access any endpoint
- No authentication required
- No authorization checks

✅ **After:**

- All routes require valid session (except auth routes)
- Role-based access control enforced
- Permission matrix fully implemented
- 401 Unauthorized for no session
- 403 Forbidden for insufficient permissions

## Frontend Impact

Frontend applications must now:

1. **Login before accessing any API**

   ```javascript
   await fetch("http://localhost:3000/api/auth/login", {
     method: "POST",
     credentials: "include", // Important!
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, password }),
   });
   ```

2. **Include credentials in all requests**

   ```javascript
   await fetch("http://localhost:3000/api/users", {
     credentials: "include", // This sends the session cookie
   });
   ```

3. **Handle 401 responses** (redirect to login)

   ```javascript
   if (response.status === 401) {
     // Redirect to login page
     window.location.href = "/login";
   }
   ```

4. **Handle 403 responses** (show permission error)
   ```javascript
   if (response.status === 403) {
     // Show "You don't have permission" message
   }
   ```

## Next Steps

- ✅ Authentication middleware applied
- ✅ Authorization rules implemented
- ✅ Permission matrix enforced
- ⏭️ Test all routes with different user types
- ⏭️ Update frontend to handle authentication
- ⏭️ Add integration tests for authorization

## Quick Test Commands

See [auth_test.http](test/http/auth_test.http) for HTTP test requests.

Test credentials in [TEST_CREDENTIALS.md](TEST_CREDENTIALS.md).

# Test User Credentials

After running `npm run seed`, the following test users are available for authentication:

## Master User (P01)

- **Email:** `owner1@barbierro.com`
- **Password:** `Password123!`
- **Full Name:** Juan Dela Cruz
- **User Type:** P01 (Master)
- **Permissions:** Full system access

## Branch Manager Users (P02)

### Manager 1

- **Email:** `owner2@barbierro.com`
- **Password:** `Password123!`
- **Full Name:** Maria Santos
- **User Type:** P02 (Branch Manager)
- **Permissions:** Branch-level management

### Manager 2

- **Email:** `owner3@barbierro.com`
- **Password:** `Password123!`
- **Full Name:** Pedro Reyes
- **User Type:** P02 (Branch Manager)
- **Permissions:** Branch-level management

## Cashier User (P03)

- **Email:** `cashier4@barbierro.com`
- **Password:** `Password123!`
- **Full Name:** Ana Cruz
- **User Type:** P03 (Cashier)
- **Permissions:** Point-of-sale operations only

---

## Testing Login

### Using cURL:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner1@barbierro.com","password":"Password123!"}'
```

### Using HTTP file (test/http/auth_test.http):

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "owner1@barbierro.com",
  "password": "Password123!"
}
```

### Using JavaScript/Fetch:

```javascript
const response = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    email: "owner1@barbierro.com",
    password: "Password123!",
  }),
});

const data = await response.json();
console.log(data);
```

---

**Note:** All users share the same default password (`Password123!`) for testing purposes. In production, users should set unique, strong passwords.

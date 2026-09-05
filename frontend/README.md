## To start locally with database

## Pre requisites: Must have docker app installed and opened in the background

1. The current folder must be folder/backend, then Run npm i to install modules
2. Open docker app the go back to workspace
3. Run script npm run setup-docker
4. Run npx prisma migrate dev to migrate all schema from prisma folder to your deployed PG docker
5. Run npm run seed to generate test data for all scenarios
6. Create .env variable in /backend, copy paste the following below:

DATABASE_URL=postgresql://admin:admin@localhost:5432/mydb

# Frontend URLs for CORS

BB_POS_URL=http://localhost:5173
BB_SUITE_URL=http://localhost:5174

# Session secret (change in production!)

SESSION_SECRET=barbierro-secret-key-change-in-production

7. Run npm run dev

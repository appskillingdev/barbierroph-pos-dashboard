import express from "express";
import session from "express-session";
import request from "supertest";
import { BarbierroAPIRoutes } from "../../src/apiRoutes.js";

export async function createAuthenticatedAgent(isCorrectAuth: boolean) {
  const app = express();

  app.use(
    session({
      secret: "test-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const routes = BarbierroAPIRoutes();
  app.use("/api", routes);
  app.use(routes);

  const agent = request.agent(app);
  const loginRequest = agent.post("/api/auth/login").send({
    email: "owner1@barbierro.com",
    password: isCorrectAuth ? "Password123!" : "WrongPassword123!",
  });

  await loginRequest.expect(isCorrectAuth ? 200 : 401);

  return agent;
}

export async function createNonExistingAgent() {
  const app = express();

  app.use(
    session({
      secret: "test-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const routes = BarbierroAPIRoutes();
  app.use("/api", routes);
  app.use(routes);

  const agent = request.agent(app);
  const loginRequest = agent.post("/api/auth/login").send({
    email: "nonexistent@barbierro.com",
    password: "Password123!",
  });

  await loginRequest.expect(401);

  return agent;
}

import axios from "axios";
import { startServer, stopServer } from "../../app.js";
import { sequelize } from "../../db/database.js";
import faker from "faker";

describe("Auth APIs", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await startServer();
    request = axios.create({
      baseURL: "http://localhost:8080",
      validateStatus: null,
    });
  });

  afterAll(async () => {
    await sequelize.drop();
    await stopServer(server);
  });

  describe("POST to /auth/signup", () => {
    it("returns 201 and authrozation token when user details are valid", async () => {
      const user = makeValidUserDetails();

      const res = await request.post("/auth/signup", user);

      expect(res.status).toBe(201);
      expect(res.data.token.length).toBeGreaterThan(0);
    });

    it("returns 409 when username has already been taken", async () => {
      const user = makeValidUserDetails();
      const firstSignup = await request.post("/auth/signup", user);
      expect(firstSignup.status).toBe(201);

      const res = await request.post("/auth/signup", user);

      expect(res.status).toBe(409);
      expect(res.data.message).toBe(`${user.username} exists`);
    });
  });
});

function makeValidUserDetails() {
  const fakeUser = faker.helpers.userCard();
  return {
    name: fakeUser.name,
    username: fakeUser.username,
    email: fakeUser.email,
    password: faker.internet.password(10, true),
  };
}

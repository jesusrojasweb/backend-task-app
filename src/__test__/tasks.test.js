const supertest = require("supertest");
const { app, server } = require("../../index");

const api = supertest(app);

const JWT =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVKZHJrTV9fbi1uUHNFMGw1YUhHbSJ9.eyJpc3MiOiJodHRwczovL2Rldi1oNzBqb2E2eC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjJlMWZhYjdiNTRiYTI4ZTdmMGU0ZmRlIiwiYXVkIjoiaHR0cHM6Ly90YXNrYXBwamVzdXNyb2phc3dlYi5jb20vYXBpIiwiaWF0IjoxNjU5MjI2MTY5LCJleHAiOjE2NTkzMTI1NjksImF6cCI6IkxKaWlOQUYzRlhDZUY2Z0JOamlwQ0t5bHBXQWNZZ0hrIn0.i1aNS4YDr00py85Ff3xObAaAkPlYNJtKkI-AGogQKwWMRznHjuMuBwDImzSjtoCwe1tUZyL0TUzF8EiEayG0aTL14jWvIXMz6XJ7JvFr5dckOVlnhnsMnbhJRt1dNIg9b7Sj2Ef07nVJFkFEg1fN53gKDk8csfOldRB6UNKXgtB5F3PxwPOOt-XD3HQ_4d8jtD8jiNyu1DwwiRvoQkmxrWCOELSgayZ3bHGjSsNU1fZzum6yYD3YPvJOUUVqGR21Q7MmzEI3LUWy48WSkKECAWjVcJKBae4YUmZTMXb_ecXQ6cLLiJLjNb5dpsevqK83Qzw2lSzMpWqJQMKrTM_XqQ";

describe("tasks", () => {
  test("no autenticated return 401", async () => {
    await api.get("/tasks").expect(401);
  });

  test("task are getting", async () => {
    await api
      .get("/tasks")
      .set("Authorization", "Bearer " + JWT)
      .expect(200);
  });

  test("a valid task can be added", async () => {
    const newTask = {
      task: "New Task",
    };

    await api
      .post("/tasks")
      .set("Authorization", "Bearer " + JWT)
      .send(newTask)
      .expect(200);
  });

  test("task without content is not added", async () => {
    const newTask = {};

    await api
      .post("/tasks")
      .set("Authorization", "Bearer " + JWT)
      .send(newTask)
      .expect(500);
  });
});

afterAll(() => {
  server.close();
});

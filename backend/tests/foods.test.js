const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const createApp = require("../src/app");

function requestJson(server, path) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    http
      .get({ port, path }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

test("GET /healthz returns ok", async (t) => {
  const app = createApp();
  const server = app.listen(0);
  t.after(() => server.close());
  const { status, body } = await requestJson(server, "/healthz");
  assert.strictEqual(status, 200);
  assert.strictEqual(body.status, "ok");
});

test("GET /api/foods returns a non-empty list", async (t) => {
  const app = createApp();
  const server = app.listen(0);
  t.after(() => server.close());
  const { status, body } = await requestJson(server, "/api/foods");
  assert.strictEqual(status, 200);
  assert.ok(body.count > 0);
  assert.ok(Array.isArray(body.results));
});

test("GET /api/foods/doro-wat returns the dish", async (t) => {
  const app = createApp();
  const server = app.listen(0);
  t.after(() => server.close());
  const { status, body } = await requestJson(server, "/api/foods/doro-wat");
  assert.strictEqual(status, 200);
  assert.strictEqual(body.name, "Doro Wat");
});

test("GET /api/foods/unknown-dish returns 404", async (t) => {
  const app = createApp();
  const server = app.listen(0);
  t.after(() => server.close());
  const { status } = await requestJson(server, "/api/foods/unknown-dish");
  assert.strictEqual(status, 404);
});

test("GET /api/foods?vegan=true only returns vegan dishes", async (t) => {
  const app = createApp();
  const server = app.listen(0);
  t.after(() => server.close());
  const { body } = await requestJson(server, "/api/foods?vegan=true");
  assert.ok(body.results.every((f) => f.vegan === true));
});

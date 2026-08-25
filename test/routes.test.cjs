const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const request = require("supertest");
const app = require("../app.cjs");

describe("message board routes", () => {
  it("renders the index with the sample messages", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.match(response.text, /Mini Message Board/);
    assert.match(response.text, /Hi there!/);
    assert.match(response.text, /Hello World!/);
  });

  it("renders the new message form", async () => {
    const response = await request(app).get("/new");

    assert.equal(response.status, 200);
    assert.match(response.text, /method="POST" action="\/new"/);
    assert.match(response.text, /name="messageUser"/);
    assert.match(response.text, /name="messageText"/);
  });

  it("adds a message and redirects to the index", async () => {
    const createResponse = await request(app)
      .post("/new")
      .type("form")
      .send({ messageUser: "Grace", messageText: "Nice to meet you all!" });

    assert.equal(createResponse.status, 302);
    assert.equal(createResponse.headers.location, "/");

    const indexResponse = await request(app).get("/");
    assert.match(indexResponse.text, /Grace/);
    assert.match(indexResponse.text, /Nice to meet you all!/);
  });

  it("rejects an incomplete message", async () => {
    const response = await request(app)
      .post("/new")
      .type("form")
      .send({ messageUser: "", messageText: "Missing a name" });

    assert.equal(response.status, 400);
    assert.match(response.text, /Please enter both your name and a message/);
  });

  it("opens an individual message page", async () => {
    const response = await request(app).get("/messages/1");

    assert.equal(response.status, 200);
    assert.match(response.text, /Hi there!/);
    assert.match(response.text, /Amando/);
  });

  it("returns a custom 404 page for an unknown message", async () => {
    const response = await request(app).get("/messages/9999");

    assert.equal(response.status, 404);
    assert.match(response.text, /Page not found/);
  });
});

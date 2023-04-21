const request = require("supertest");

const app = require("../app");
let transactionsData = require("../models/transactions");

describe("transactions", () => {
  let orignalTransactionsData;

  beforeEach(() => {
    orignalTransactionsData = [...transactionsData];
  });

  describe("/transactions", () => {
    describe("GET", () => {
      it("sends the transactions data", async () => {
        const response = await request(app).get("/transactions");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(transactionsData);
      });
    });
  });
});

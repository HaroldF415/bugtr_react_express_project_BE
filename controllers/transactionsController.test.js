const request = require("supertest");

const app = require("../app");
let transactionsData = require("../models/transactions");

describe("transactions", () => {
  let orignalTransactionsData;

  beforeEach(() => {
    orignalTransactionsData = [...transactionsData];
  });

  describe("/TRANSACTIONS", () => {
    describe("GET", () => {
      it("sends the transactions data", async () => {
        const response = await request(app).get("/transactions");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(transactionsData);
      });
    });
    describe("POST", () => {
      it("adds new transaction to end of transactions array", async () => {
        const newLastArrayPosition = transactionsData.length;
        const newTransaction = {
          id: "92d130f9-9e33-4cb0-8fd5-2a60a40hVd8b",
          item_name: "cable bill",
          amount: 100,
          date: "2023-04-12",
          from: "Spectrum",
          category: "bills",
          transaction_type: "withdrawal",
        };

        await new Promise((resolve) => {
          request(app).post(`/transactions`).send(newTransaction).set("Accept", "application/json").expect("headers.location", "/transactions").expect("statusCode", 303).end(resolve);
        });

        expect(transactionsData[newLastArrayPosition]).toEqual(newTransaction);
      });
    });
  });
});

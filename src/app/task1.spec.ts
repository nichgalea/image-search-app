import { Transaction } from "src/models";

import { getBalanceByCategoryInPeriod } from "./task1";

const mockData: Transaction[] = [
  {
    id: 123,
    sourceAccount: "my_account",
    targetAccount: "supermarket",
    amount: -14,
    category: "groceries",
    time: "2018-03-04"
  },
  {
    id: 125,
    sourceAccount: "my_account",
    targetAccount: "coffee_shop",
    amount: -30,
    category: "eating_out",
    time: "2018-03-12"
  },
  {
    id: 124,
    sourceAccount: "my_account",
    targetAccount: "supermarket",
    amount: -3,
    category: "groceries",
    time: "2018-03-15"
  },
  {
    id: 126,
    sourceAccount: "my_account",
    targetAccount: "cinema",
    amount: -12,
    category: "movies",

    time: "2018-05-15"
  }
];

describe("findDuplicateTransactions", () => {
  it("should return 0 if an empty array is passed", () => {
    const result = getBalanceByCategoryInPeriod([], "groceries", new Date("2018-03-01"), new Date("2018-03-31"));
    expect(result).toBe(0);
  });

  it("should calculate the correct balance", () => {
    const result = getBalanceByCategoryInPeriod(mockData, "groceries", new Date("2018-03-01"), new Date("2018-03-31"));
    expect(result).toBe(-17);
  });
});

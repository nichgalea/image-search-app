import { Transaction } from "src/models";

import { findDuplicateTransactions } from "./task2";

const mockData: Transaction[] = [
  {
    id: 3,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:34:30.000Z"
  },
  {
    id: 1,
    sourceAccount: "A",
    targetAccount: "B",

    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:00.000Z"
  },
  {
    id: 6,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:05.000Z"
  },
  {
    id: 4,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:36:00.000Z"
  },
  {
    id: 2,
    sourceAccount: "A",
    targetAccount: "B",
    amount: 100,
    category: "eating_out",
    time: "2018-03-02T10:33:50.000Z"
  },
  {
    id: 5,
    sourceAccount: "A",
    targetAccount: "C",
    amount: 250,
    category: "other",
    time: "2018-03-02T10:33:00.000Z"
  }
];
const mockResult: Transaction[][] = [
  [
    {
      id: 1,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:00.000Z"
    },
    {
      id: 2,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:50.000Z"
    },
    {
      id: 3,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:34:30.000Z"
    }
  ],
  [
    {
      id: 5,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:00.000Z"
    },

    {
      id: 6,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:05.000Z"
    }
  ]
];

describe("findDuplicateTransactions", () => {
  it("should return empty array when no arguments are passed", () => {
    const result = findDuplicateTransactions();
    expect(result.length).toBe(0);
  });

  it("should return empty array when empty array is passed", () => {
    const result = findDuplicateTransactions([]);
    expect(result.length).toBe(0);
  });

  it("should return the right duplicate transactions in groups", () => {
    const result = findDuplicateTransactions(mockData);

    // sort result array, and all transaction groups
    result.sort((a, b) => a.length - b.length);
    result.forEach(g => g.sort((a, b) => a.id - b.id));

    // do the same for mockResult
    mockResult.sort((a, b) => a.length - b.length);
    mockResult.forEach(g => g.sort((a, b) => a.id - b.id));

    expect(result).toEqual(mockResult);
  });
});

import { Transaction } from "src/models";

/**
 * @param {array} transactions - The transactions list.
 * @param {string} category - The name of the category
 * @param {date} start - The start date of the date range. Inclusive.
 * @param {date} end - The end date of the date range. Exclusive.
 * @returns {number} - The balance number
 */
export function getBalanceByCategoryInPeriod(
  transactions: Transaction[],
  category: string,
  start: Date,
  end: Date
): number {
  return transactions
    .filter(t => t.category === category && start <= new Date(t.time) && end > new Date(t.time))
    .reduce((acc, curr) => acc + curr.amount, 0);
}

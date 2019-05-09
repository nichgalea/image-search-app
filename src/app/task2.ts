import { Transaction } from "src/models";

/**
 * @param {array} transactions - The transactions list.
 * @returns {array} - A list of grouped duplicate transactions.
 */
export function findDuplicateTransactions(transactions: Transaction[] = []): Transaction[][] {
  const duplicates = [];

  // get all duplicates in flat collection
  for (const t1 of transactions) {
    for (const t2 of transactions) {
      if (t1 === t2) {
        continue;
      }

      const sameSource = t1.sourceAccount === t2.sourceAccount;
      const sameTarget = t1.targetAccount === t2.targetAccount;
      const sameCategory = t1.category === t2.category;
      const sameAmount = t1.amount === t2.amount;
      const withinOneMinute = Math.abs(new Date(t1.time).getTime() - new Date(t2.time).getTime()) < 60000;

      if (sameSource && sameTarget && sameCategory && sameAmount && withinOneMinute) {
        duplicates.push(t1);
        break;
      }
    }
  }

  const groups: Transaction[][] = [];

  // group duplicates
  while (duplicates.length > 0) {
    const transaction = duplicates.pop()!;

    if (groups.length === 0) {
      groups.push([transaction]);
    } else {
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const { sourceAccount, targetAccount, category, amount, id } = group[0];

        if (transaction.id === id) {
          continue;
        }

        const sameSource = transaction.sourceAccount === sourceAccount;
        const sameTarget = transaction.targetAccount === targetAccount;
        const sameCategory = transaction.category === category;
        const sameAmount = transaction.amount === amount;

        if (sameSource && sameTarget && sameCategory && sameAmount) {
          group.push(transaction);
          break;
        } else if (i === groups.length - 1) {
          groups.push([transaction]);
        }
      }
    }
  }

  return groups;
}

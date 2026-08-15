import { Item } from "../context/TripContext";

export type Balance = {
  person: string;
  paid: number;
  owed: number;
  net: number;
};

export type Transfer = {
  key: string;
  from: string;
  to: string;
  amount: number;
};

export type ShareLine = {
  itemName: string;
  share: number;
};

export function computeBalances(people: string[], items: Item[]): Balance[] {
  const paid: Record<string, number> = {};
  const owed: Record<string, number> = {};

  for (const person of people) {
    paid[person] = 0;
    owed[person] = 0;
  }

  for (const item of items) {
    paid[item.paidBy] += item.price;

    const share = item.price / item.sharedBy.length;
    for (const person of item.sharedBy) {
      owed[person] += share;
    }
  }

  return people.map((person) => ({
    person,
    paid: paid[person],
    owed: owed[person],
    net: paid[person] - owed[person],
  }));
}

export function computeTransfers(balances: Balance[]): Transfer[] {
  const debtors = balances
    .filter((b) => b.net < -0.005)
    .map((b) => ({ person: b.person, amount: -b.net }));
  const creditors = balances
    .filter((b) => b.net > 0.005)
    .map((b) => ({ person: b.person, amount: b.net }));

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    transfers.push({
      key: `${debtors[i].person}->${creditors[j].person}`,
      from: debtors[i].person,
      to: creditors[j].person,
      amount: pay,
    });
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;
    if (debtors[i].amount < 0.005) i++;
    if (creditors[j].amount < 0.005) j++;
  }

  return transfers;
}

export function computePersonShares(person: string, items: Item[]): ShareLine[] {
  const lines: ShareLine[] = [];
  for (const item of items) {
    if (item.sharedBy.includes(person)) {
      lines.push({
        itemName: item.name,
        share: item.price / item.sharedBy.length,
      });
    }
  }
  return lines;
}
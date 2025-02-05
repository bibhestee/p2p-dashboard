import { Transaction } from "./transaction.dt";

export async function getTransactions() {
  const response = await fetch(
    `/api/transactions`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch transaction`);
  }
  return response.json();
}

export async function getTransaction(id: string) {
  const response = await fetch(
    `/api/transactions/${id}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch transaction with id ${id}`);
  }
  return response.json();
}

export async function createTransaction(transaction: Transaction) {
  const response = await fetch(
    `api/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to create transaction`);
  }
  return response.json();
}

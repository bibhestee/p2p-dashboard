import { Transaction, TransactionStatus } from "@/lib/transaction.dt";

export class DB {
  static transactions: Transaction[] = [
    {
      id: "TX001",
      senderName: "John Doe",
      receiverName: "Jane Smith",
      amount: 100,
      status: TransactionStatus.Completed,
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "TX002",
      senderName: "Alice Johnson",
      receiverName: "Bob Williams",
      amount: 50,
      status: TransactionStatus.Pending,
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "TX003",
      senderName: "Eva Brown",
      receiverName: "Michael Davis",
      amount: 75,
      status: TransactionStatus.Failed,
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "TX004",
      senderName: "Chris Lee",
      receiverName: "Sarah Wilson",
      amount: 200,
      status: TransactionStatus.Completed,
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "TX005",
      senderName: "David Miller",
      receiverName: "Emma Taylor",
      amount: 150,
      status: TransactionStatus.Pending,
      createdAt: "2023-06-15T10:30:00Z",
    },
  ];

  static getTransactions(): Transaction[] {
    return this.transactions;
  }

  static addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  static getTransaction(id: string): Transaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }
}

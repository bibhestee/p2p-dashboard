export interface Transaction {
  id: string;
  senderName: string;
  receiverName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

export enum TransactionStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export const TransactionStatusColor = {
  Pending: "yellow-500",
  Completed: "green-500",
  Failed : "red-500",
}

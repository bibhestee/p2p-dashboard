import React, { ReactElement } from "react";
import TransactionTable from "./components/transaction-table";

const Dashboard = (): ReactElement => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TransactionTable />
    </main>
  );
};

export default Dashboard;

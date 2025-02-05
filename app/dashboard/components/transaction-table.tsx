"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Transaction,
  TransactionStatus,
  TransactionStatusColor,
} from "@/lib/transaction.dt";
import { getTransactions } from "@/lib/request-handler";
import TransactionTableSkeleton from "./table-skeleton";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";

const TransactionTable = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | TransactionStatus>("All");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    }

    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(
        (transaction) => filter === "All" || transaction.status === filter
      )
    );
  }, [filter, transactions]);

  const handleRowClick = (id: string) => {
    router.push(`/transaction/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="status-filter" className="font-medium">
          Filter by Status:
        </label>
        <Select
          onValueChange={(value) =>
            setFilter(value as "All" | TransactionStatus)
          }
        >
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value={TransactionStatus.Pending}>Pending</SelectItem>
            <SelectItem value={TransactionStatus.Completed}>
              Completed
            </SelectItem>
            <SelectItem value={TransactionStatus.Failed}>Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Sender Name</TableHead>
            <TableHead>Receiver Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TransactionTableSkeleton />
          ) : (
            filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => handleRowClick(transaction.id)}
              >
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.senderName}</TableCell>
                <TableCell>{transaction.receiverName}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      `text-${TransactionStatusColor[`${transaction.status}`]}`
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDate(transaction.createdAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;

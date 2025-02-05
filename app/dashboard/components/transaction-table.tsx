"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";

const TransactionTable = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | TransactionStatus>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesFilter = filter === "All" || transaction.status === filter;
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.senderName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.receiverName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredTransactions(filtered);
  }, [filter, transactions, searchTerm]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    }

    fetchData();
    setIsLoading(false);
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/transaction/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row items-center space-x-2">
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

        <div className="w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e: { target: { value: string } }) =>
              setSearchTerm(e.target.value)
            }
            className="w-full sm:w-[300px]"
          />
        </div>
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
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;

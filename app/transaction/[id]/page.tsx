"use client";

import { StatusIcon } from "@/components/shared/status-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransaction } from "@/lib/request-handler";
import { Transaction, TransactionStatusColor } from "@/lib/transaction.dt";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactElement, use, useEffect, useState } from "react";
import TransactionContentSkeleton from "../components/content-skeleton";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";

const Page = ({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactElement => {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data }: { data: Transaction} = await getTransaction(id);
      setTransaction(data);
      setIsLoading(false);
    }

    fetchData();
  }, [id, setTransaction]);
  return (
    <div>
      <div className="w-full  flex flex-col md:flex-row p-4">
        <Link href="/dashboard">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>

        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Transaction Details
            </CardTitle>
          </CardHeader>
          {isLoading ? (
            <TransactionContentSkeleton />
          ) : (
            transaction && (
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Transaction ID</span>
                  <span className="text-lg">{id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Sender Name</span>
                  <span className="text-lg">{transaction?.senderName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Receiver Name</span>
                  <span className="text-lg">{transaction?.receiverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Amount</span>
                  <span className="text-lg font-bold">
                    ${transaction?.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Status</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-2 px-3 py-1",
                      `text-${TransactionStatusColor[`${transaction.status}`]}`
                    )}
                  >
                    <StatusIcon status={transaction.status} />
                    <span className="text-base">{transaction.status}</span>
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Timestamp</span>
                  <span className="text-lg">{formatDate(transaction.createdAt)}</span>
                </div>
              </CardContent>
            )
          )}
        </Card>
      </div>
    </div>
  );
};

export default Page;

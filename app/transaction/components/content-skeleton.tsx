import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionContentSkeleton() {
  return (
    <CardContent className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Transaction ID</span>
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Sender Name</span>
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Receiver Name</span>
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Amount</span>
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Status</span>
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Timestamp</span>
        <Skeleton className="h-4 w-32" />
      </div>
    </CardContent>
  );
}

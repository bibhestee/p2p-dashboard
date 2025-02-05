import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TransactionTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

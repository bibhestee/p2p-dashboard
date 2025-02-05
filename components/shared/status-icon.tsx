import { TransactionStatus } from "@/lib/transaction.dt"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

export const StatusIcon = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case TransactionStatus.Completed:
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case TransactionStatus.Failed:
      return <XCircle className="h-5 w-5 text-red-500" />
    case TransactionStatus.Pending:
      return <Clock className="h-5 w-5 text-yellow-500" />
  }
}
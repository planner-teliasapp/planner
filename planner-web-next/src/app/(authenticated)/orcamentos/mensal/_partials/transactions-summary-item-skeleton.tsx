import { DollarSignIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionSummaryItemSkeleton() {

  return (
    <li className="w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <Skeleton className="p-2 rounded-md">
          <DollarSignIcon size={24} className="text-transparent" />
        </Skeleton>
        <div>
          <Skeleton className="font-semibold text-transparent">AAAAAAAAAAAAAAA </Skeleton>
          <Skeleton className="text-sm text-transparent">22/22/2222</Skeleton>
        </div>
      </div>
      <Skeleton className="text-transparent">R$ 999.999,99</Skeleton>
    </li>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export default function TaskListCardSkeleton() {
  return (
    <li
      className="flex flex-col justify-start items-start rounded p-2 py-3 cursor-pointer gap-1">
      <Skeleton className='h-1 w-full' />
      <div className='flex justify-between items-start w-full'>
        <Skeleton className="h-5 text-transparent">Sample text</Skeleton>
        <Skeleton className='h-5 text-transparent ml-1'>Sample text %</Skeleton>
      </div>
    </li>
  )
}
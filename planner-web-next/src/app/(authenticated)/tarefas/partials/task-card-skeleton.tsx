import { Skeleton } from "@/components/ui/skeleton"

export default function TaskCardSkeleton() {
  return (
    <li
      className='flex justify-start items-center gap-4 rounded p-2'
    >
      <Skeleton className="size-8" />
      <div
        className=' min-h-[44px] flex flex-col justify-center items-start gap-1'
      >
        <Skeleton className='leading-relaxed tracking-wide line-clamp-1 text-transparent'>Sample Text</Skeleton>
        <Skeleton className='text-xs text-transparent'>Sample Text</Skeleton>
      </div>
    </li>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { CreateRecurringTransactionDto, CreateTransactionDto } from "@/models/transaction"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import CreateRecurringTransactionForm from "./create-recurring-transaction-form"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  onSubmit: (data: CreateRecurringTransactionDto) => void
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CreateRecurringTransactionButton({ onSubmit, isLoading, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(data: CreateRecurringTransactionDto) {
    if (onSubmit) {
      try {
        await onSubmit(data)
        setIsOpen(false)
      } catch (error) {

      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className={cn("w-full sm:w-fit", className)}>
          <span>Criar Transação Recorrente</span>
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">Adicionar nova transação recorrente</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[90%] pr-2">
          <CreateRecurringTransactionForm onSubmit={handleSubmit} isLoading={isLoading} className="px-2" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

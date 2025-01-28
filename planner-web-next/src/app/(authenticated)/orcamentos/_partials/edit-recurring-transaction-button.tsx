"use client"

import { useToast } from "@/hooks/use-toast"
import { Edit2Icon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useMemo, useState } from "react"
import { UpdateRecurringTransactionDto } from "@/models/transaction"
import { useBudgets } from "@/hooks/use-budgets"
import UpdateRecurringTransactionForm from "./update-recurring-transaction-form"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
  transactionId: string
  className?: ClassNameValue
}

export default function EditRecurringTransactionButton({ transactionId, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { recurringTransactions, updateRecurringTransaction, isUpdatingRecurringTransaction } = useBudgets()
  const { toast } = useToast()

  const transaction = useMemo(() => {
    return recurringTransactions?.items.find(t => t.id === transactionId)
  }, [recurringTransactions, transactionId])

  async function handleUpdate(data: UpdateRecurringTransactionDto) {
    try {
      await updateRecurringTransaction(data)
      toast({
        title: "Transação Atualizada"
      })
      setIsOpen(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocorreu um erro ao atualizar a transação"
      toast({
        title: "",
        description: message,
        variant: "destructive"
      })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
        >
          <Edit2Icon />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-5">
        <SheetHeader className="px-1">
          <SheetTitle>Atualizar transação</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[95%] pr-6">
          <UpdateRecurringTransactionForm
            transaction={transaction}
            handleUpdate={handleUpdate}
            className="px-1 mt-4"
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

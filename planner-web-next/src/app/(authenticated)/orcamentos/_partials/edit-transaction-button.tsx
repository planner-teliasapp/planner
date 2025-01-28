"use client"

import { useBudget } from "@/hooks/use-budget"
import { useToast } from "@/hooks/use-toast"
import { validatedMonth, validatedYear } from "@/lib/utils"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useMemo, useState } from "react"
import UpdateTransactionForm from "./update-transaction-form"
import { useAmp } from "next/amp"
import { set } from "date-fns"
import { UpdateTransactionDto } from "@/models/transaction"
import { useBudgets } from "@/hooks/use-budgets"

interface Props {
  transactionId: string
  className?: ClassNameValue
}

export default function EditTransactionButton({ transactionId, className }: Props) {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const year = validatedYear(searchParams.get("ano")) || new Date().getFullYear()
  const month = validatedMonth(searchParams.get("mes")) || new Date().getMonth() + 1

  const { updateTransaction, isUpdatingTransaction, deleteTransaction, isDeletingTransaction, transactions, } = useBudget({
    year,
    month
  })
  const { updateRecurringTransaction, isUpdatingRecurringTransaction } = useBudgets()
  const { toast } = useToast()

  const transaction = useMemo(() => {
    return transactions?.items.find(t => t.id === transactionId)
  }, [transactions, transactionId])

  async function handleUpdate(data: UpdateTransactionDto) {
    try {
      const { recurringTransactionId, ...rest } = data

      await updateTransaction(rest)
      await updateRecurringTransaction({
        id: transaction?.recurringTransactionId || "",
        referenceValue: rest.amount || 0,
      })
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

  async function handleDelete() {
    try {
      await deleteTransaction(transactionId)
      toast({
        title: "Transação excluída",
        description: "A transação foi excluída com sucesso"
      })
      setIsOpen(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocorreu um erro ao excluir a transação"
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
          variant="default"
        >
          <Edit2Icon />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-5">
        <SheetHeader className="px-1">
          <SheetTitle>Atualizar transação</SheetTitle>
        </SheetHeader>
        <UpdateTransactionForm
          year={year}
          month={month}
          transaction={transaction}
          isLoading={isUpdatingTransaction || isDeletingTransaction || isUpdatingRecurringTransaction}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </SheetContent>
    </Sheet>
  )
}

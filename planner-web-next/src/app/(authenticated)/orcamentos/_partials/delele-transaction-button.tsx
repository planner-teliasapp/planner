"use client"

import { Button } from "@/components/ui/button"
import { useBudget } from "@/hooks/use-budget"
import { useBudgets } from "@/hooks/use-budgets"
import { useToast } from "@/hooks/use-toast"
import { validatedMonth, validatedYear } from "@/lib/utils"
import { Trash2Icon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"
import { useSearchParams } from "next/navigation"

interface Props {
  transactionId: string
  className?: ClassNameValue
}

export default function DeleteTransactionButton({ transactionId, className }: Props) {
  const searchParams = useSearchParams()

  const year = validatedYear(searchParams.get("ano")) || new Date().getFullYear()
  const month = validatedMonth(searchParams.get("mes")) || new Date().getMonth() + 1

  const { deleteTransaction, isDeletingTransaction } = useBudget({
    year,
    month
  })
  const { toast } = useToast()

  async function handleDelete() {
    try {
      await deleteTransaction(transactionId)
      toast({
        title: "Transação deletada"
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocorreu um erro ao deletar a transação"
      toast({
        title: "Erro ao deletar transação",
        description: message,
        variant: "destructive"
      })
    }
  }

  return (
    <Button size="icon" variant="destructive" onClick={handleDelete}>
      <Trash2Icon />
    </Button>
  )
}

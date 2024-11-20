"use client"

import { Button } from "@/components/ui/button"
import { useBudgets } from "@/hooks/use-budgets"
import { useToast } from "@/hooks/use-toast"
import { Trash2Icon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  transactionId: string
  className?: ClassNameValue
}

export default function DeleteTransactionButton({ transactionId, className }: Props) {

  const { deleteTransaction, isDeletingTransaction } = useBudgets()
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

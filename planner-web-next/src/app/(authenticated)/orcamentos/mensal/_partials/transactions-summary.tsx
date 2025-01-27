import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"


import { ClassNameValue } from "tailwind-merge"
import TransactionSummaryItem from "./transactions-summary-item"
import { Transaction, UpdateTransactionDto } from "@/models/transaction"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import TransactionSummaryItemSkeleton from "./transactions-summary-item-skeleton"
import { useState } from "react"
import UpdateTransactionForm from "../../_partials/update-transaction-form"
import { useBudget } from "@/hooks/use-budget"
import { useToast } from "@/hooks/use-toast"

interface Props {
  year: number
  month: number
  transactions?: Transaction[]
  searchParams: string
  isLoading?: boolean
  className?: ClassNameValue
}

export default function TransactionSummary({ transactions = [], searchParams, className, isLoading, year, month }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined)
  const { updateTransaction, isUpdatingTransaction, deleteTransaction, isDeletingTransaction } = useBudget({ year, month })
  const { toast } = useToast()

  async function handleUpdate(data: UpdateTransactionDto) {
    try {
      await updateTransaction(data)
      setIsOpen(false)
      toast({
        title: "Transação atualizada",
        description: "A transação foi atualizada com sucesso",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao atualizar transação",
        description: "Ocorreu um erro ao atualizar a transação",
        variant: "destructive"
      })
      throw error
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTransaction(id)
      setIsOpen(false)
      toast({
        title: "Transação excluída",
        description: "A transação foi excluída com sucesso",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao excluir transação",
        description: "Ocorreu um erro ao excluir a transação",
        variant: "destructive"
      })
      throw error
    }
  }

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row justify-between items-baseline">
        <CardTitle>Transações</CardTitle>
        <Link href={`/orcamentos/mensal/transacoes${searchParams}`}>
          <ExternalLinkIcon />
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <ul className="w-full flex flex-col gap-2 sm:gap-4 pr-4">
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
            <TransactionSummaryItemSkeleton />
          </ul>
        ) : (
          <div>
            {transactions.length == 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground">Nenhuma transação registrada.</p>
              </div>
            ) : (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <ScrollArea className="h-[520px]">
                  <ul className="w-full flex flex-col gap-2 sm:gap-4 pr-4">
                    {transactions.map((transaction) => (
                      <TransactionSummaryItem
                        key={transaction.id}
                        transaction={transaction}
                        onClick={() => setSelectedTransaction(transaction)}
                      />
                    ))}
                  </ul>
                </ScrollArea>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Atualizar transação</SheetTitle>
                  </SheetHeader>
                  <UpdateTransactionForm
                    transaction={selectedTransaction}
                    isLoading={isUpdatingTransaction || isDeletingTransaction}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                  />
                </SheetContent>
              </Sheet>

            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

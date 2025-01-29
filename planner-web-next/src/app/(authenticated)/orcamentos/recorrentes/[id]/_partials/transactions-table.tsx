"use client"

import { Transaction, UpdateTransactionDto } from "@/models/transaction"
import { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/lib/utils"
import { PaymentMethod } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table"
import { paymentMethodMapper } from "../../../_utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useBudgets } from "@/hooks/use-budgets"
import { useToast } from "@/hooks/use-toast"
import UpdateTransactionForm from "../../../_partials/update-transaction-form"
import { Button } from "@/components/ui/button"
import { Edit2Icon } from "lucide-react"

export function getColumns(setSelectedTransaction: (transaction: Transaction) => void, setIsOpen: (isOpen: boolean) => void): ColumnDef<Transaction>[] {
  return [
    {
      accessorKey: "date",
      header: () => <p className="text-center">Data</p>,
      cell: (row) => <p className="text-center">{new Date(row.getValue() as string).toLocaleDateString()}</p>
    },
    {
      accessorKey: "amount",
      header: () => <p className="text-center">Valor</p>,
      cell: (row) => <p className="text-center">{formatCurrency(row.getValue() as number)}</p>,
    },
    {
      accessorKey: "paymentMethod",
      header: () => <p className="text-center">Método de Pagamento</p>,
      cell: (row) => <p className="text-center">{paymentMethodMapper[row.getValue() as PaymentMethod].label}</p>,
    },
    {
      accessorKey: "id",
      header: () => <p className="text-center">Ações</p>,
      cell: (row) => {
        const transaction = row.row.original as Transaction
        return (
          <div className="flex justify-center items-center gap-1">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSelectedTransaction(transaction)
                  setIsOpen(true)
                }}
              >
                <Edit2Icon />
              </Button>
            </SheetTrigger>
          </div>
        )
      },
    },
  ]
}

interface Props {
  transactions?: Transaction[]
  isLoading?: boolean
}

export default function TransactionsTable({ transactions = [], isLoading }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined)
  const { updateRecurringTransaction, isUpdatingRecurringTransaction, updateTransaction, isUpdatingTransaction, deleteTransaction, isDeletingTransaction } = useBudgets()
  const { toast } = useToast()

  async function handleUpdate(data: UpdateTransactionDto) {
    try {
      await updateTransaction(data)
      await updateRecurringTransaction({
        id: selectedTransaction?.recurringTransactionId || "",
        referenceValue: data.amount || 0,
      })
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>

      <DataTable columns={getColumns(setSelectedTransaction, setIsOpen)} data={transactions} isLoading={isLoading} />

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
  )
}

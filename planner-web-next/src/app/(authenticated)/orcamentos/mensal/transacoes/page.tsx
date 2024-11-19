import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { convertIntToMonth, validatedMonth, validatedYear } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import TransactionsTable from "./_partials/transactions-table"
import CreateTransactionButton from "../../_partials/create-transaction-button"

interface Props {
  searchParams: {
    year?: string
    month?: string
  }
}

export default function OrcamentoMensalTransacoesPage({ searchParams }: Props) {
  const year = validatedYear(searchParams.year) || new Date().getFullYear()
  const month = validatedMonth(searchParams.month) || new Date().getMonth() + 1

  return (
    <div className='py-4 max-w-screen-2xl mx-auto'>
      <div className="w-full flex flex-col sm:flex-row justify-between items-baseline gap-4">
        <H1 className="text-center sm:text-start w-full">Transações de {convertIntToMonth(month)} de {year}</H1>
        <CreateTransactionButton />
      </div>
      <div className='pt-6'>
        <TransactionsTable />
      </div>
    </div>
  )
}

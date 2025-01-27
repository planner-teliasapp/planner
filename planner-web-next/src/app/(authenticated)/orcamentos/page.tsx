"use client"

import { buttonVariants } from "@/components/ui/button"
import { RecurringTransaction } from "@/models/transaction"
import { format } from "date-fns"
import { Loader2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import CreateRecurringTransactionButton from "./_partials/create-recurring-transaction-button"

export default function OrcamentosPage() {
  const [date, setDate] = useState(new Date())

  function setInputDate(value: string) {
    const [year, month] = value.split("-")
    setDate(curr => new Date(Number(year), Number(month) - 1, curr.getDate()))
  }

  const data = new Date("2025-1-15")

  return (
    <div>
      <section className='w-full p-4 flex flex-col'>
        <div className='w-full border rounded-lg'>
          <div className='w-full bg-card h-12 rounded-t-lg'></div>
          <div className='px-4 py-6 w-full flex flex-col justify-center items-center gap-4'>
            <input
              type="month"
              min="2020-01"
              value={format(date, "yyyy-MM")}
              onChange={(e) => setInputDate(e.target.value)}
              className='bg-transparent text-xl font-semibold text-center'
            />
          </div>
        </div>
        <Link
          href={`orcamentos/mensal/?ano=${date.getFullYear()}&mes=${date.getMonth() + 1}`}
          className={buttonVariants()}
        >
          Continuar
        </Link>
        <Link
          href={"orcamentos/recorrentes"}
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Transações Cadastradas
        </Link>
      </section>
    </div>
  )
}

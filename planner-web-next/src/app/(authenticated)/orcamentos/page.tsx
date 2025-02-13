"use client"

import { buttonVariants } from "@/components/ui/button"
import { addMonths, format, subMonths } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import RecurringTransactionSection from "./_partials/recurring-transaction-section"

export default function OrcamentosPage() {
  const [date, setDate] = useState(new Date())

  function setInputDate(value: string) {
    const [year, month] = value.split("-")
    setDate(curr => new Date(Number(year), Number(month) - 1, curr.getDate()))
  }

  return (
    <div>
      <section className='w-full max-w-screen-lg p-4 flex flex-row justify-center items-center gap-4 mx-auto'>
        <div className="w-full md:w-[28%] hidden md:block">
          <div className='border rounded-lg'>
            <div className='bg-card h-12 rounded-t-lg'></div>
            <div className='px-4 py-6 flex flex-col justify-center items-center gap-4'>
              <input
                type="month"
                min="2020-01"
                value={format(subMonths(date, 1), "yyyy-MM")}
                onChange={(e) => setInputDate(e.target.value)}
                className='bg-transparent text-xl font-semibold text-center custom-month-input'
              />
            </div>
          </div>
          <Link
            href={`orcamentos/mensal/?ano=${subMonths(date, 1).getFullYear()}&mes=${subMonths(date, 1).getMonth() + 1}`}
            className={buttonVariants({
              variant: "secondary",
              className: "mt-2 w-full",
            })}
          >
            Continuar
          </Link>
        </div>
        <div className="w-full md:w-[42%]">
          <div className='border rounded-lg'>
            <div className='bg-card h-12 rounded-t-lg'></div>
            <div className='px-4 py-6 flex flex-col justify-center items-center gap-4'>
              <input
                type="month"
                min="2020-01"
                value={format(date, "yyyy-MM")}
                onChange={(e) => setInputDate(e.target.value)}
                className='bg-transparent text-xl font-semibold text-center custom-month-input'
              />
            </div>
          </div>
          <Link
            href={`orcamentos/mensal/?ano=${date.getFullYear()}&mes=${date.getMonth() + 1}`}
            className={buttonVariants({
              className: "mt-2 w-full",
            })}
          >
            Continuar
          </Link>
        </div>
        <div className="w-full md:w-[28%] hidden md:block">
          <div className='border rounded-lg'>
            <div className='bg-card h-12 rounded-t-lg'></div>
            <div className='px-4 py-6 flex flex-col justify-center items-center gap-4'>
              <input
                type="month"
                min="2020-01"
                value={format(addMonths(date, 1), "yyyy-MM")}
                onChange={(e) => setInputDate(e.target.value)}
                className='bg-transparent text-xl font-semibold text-center custom-month-input'
              />
            </div>
          </div>
          <Link
            href={`orcamentos/mensal/?ano=${addMonths(date, 1).getFullYear()}&mes=${addMonths(date, 1).getMonth() + 1}`}
            className={buttonVariants({
              variant: "secondary",
              className: "mt-2 w-full",
            })}
          >
            Continuar
          </Link>
        </div>
      </section>
      <section className="mt-8">
        <RecurringTransactionSection />
      </section>
    </div>
  )
}

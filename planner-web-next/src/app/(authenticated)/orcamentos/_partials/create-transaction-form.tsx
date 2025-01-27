/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { PaymentMethod, TransactionType } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "@/lib/pt-zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CreatableSelect from "react-select/creatable"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateTransactionDto, RecurringTransaction } from "@/models/transaction"
import { useBudgets } from "@/hooks/use-budgets"
import { useEffect, useMemo, useState } from "react"
import { transactionMapper } from "../_utils"

const formSchema = z.object({
  description: z.object({
    label: z.string().min(2).max(50),
    value: z.string().min(2).max(50),
    __isNew__: z.boolean().optional().default(false),
  }),
  amount: z.union([
    z.string().refine((value) => parseFloat(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseFloat(value)),
    z.number().positive(),
  ]),
  date: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]),
  type: z.nativeEnum(TransactionType),
  paymentMethod: z.nativeEnum(PaymentMethod)
})

interface Props {
  onSubmit?: (data: CreateTransactionDto) => void
  isLoading?: boolean
}

export default function CreateTransactionForm({ onSubmit, isLoading }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: {
        label: "",
        value: "",
        __isNew__: false,
      },
      amount: 0,
      date: new Date(),
      type: TransactionType.EXPENSE,
      paymentMethod: PaymentMethod.TRANSFER,
    },
  })

  const [createdRecurringTransaction, setCreatedRecurringTransaction] = useState<RecurringTransaction | null>(null)
  const [isNewTransaction, setIsNewTransaction] = useState(false)

  const { recurringTransactions, isLoadingRecurringTransactions, createRecurringTransaction, isCreatingRecurringTransaction,
    updateRecurringTransaction, isUpdatingRecurringTransaction
  } = useBudgets()

  const recurringTransactionsOptions = useMemo(() => {
    return recurringTransactions?.items.map((transaction) => ({
      label: transaction.description,
      value: transaction.id,
      __isNew__: false,
    }))
  }, [recurringTransactions])

  async function onCreateRecurringTransaction(description: string) {
    const result = await createRecurringTransaction({
      description,
      referenceValue: 100,
      type: form.getValues("type"),
      frequency: "DAILY",
      paymentMethod: form.getValues("paymentMethod"),
      startDate: new Date(),
    })

    setCreatedRecurringTransaction(result)
    form.setValue("description", {
      label: result.description,
      value: result.id,
      __isNew__: false,
    })

    setIsNewTransaction(true)
  }

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    updateRecurringTransaction({
      id: createdRecurringTransaction?.id || "",
      referenceValue: values.amount,
      type: values.type,
      paymentMethod: values.paymentMethod
    })

    onSubmit && onSubmit({
      ...values,
      description: values.description.label,
      recurringTransactionId: values.description.__isNew__ ? undefined : values.description.value,
    })
  }

  useEffect(() => {
    if (form.getValues("description.__isNew__")) return
    const recurringTransaction = recurringTransactions?.items.find(
      (transaction) => transaction.id === form.getValues("description.value")
    )
    if (!recurringTransaction) return

    form.setValue("amount", recurringTransaction.referenceValue)
    form.setValue("type", recurringTransaction.type)
    form.setValue("paymentMethod", recurringTransaction.paymentMethod)

    setCreatedRecurringTransaction(recurringTransaction)

  }, [recurringTransactions?.items, form.watch().description])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <CreatableSelect
                  isLoading={isLoadingRecurringTransactions}
                  autoFocus
                  isClearable
                  options={recurringTransactionsOptions}
                  formatCreateLabel={(inputValue) => `Criar "${inputValue}"`}
                  placeholder=""
                  onCreateOption={(inputValue) => {
                    onCreateRecurringTransaction(inputValue)
                    return {
                      label: inputValue,
                      value: inputValue,
                      __isNew__: false,
                    }
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "hsl(var(--primary))" : state.isFocused ? "hsl(var(--accent))" : "hsl(var(--popover))",
                      color: state.isSelected ? "hsl(var(--primary-foreground))" : state.isFocused ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))",
                      fontSize: "0.875rem"
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "hsl(var(--foreground))",
                      fontSize: "0.875rem"
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "hsl(var(--foreground))",
                      fontSize: "0.875rem"
                    }),
                    clearIndicator: (provided) => ({
                      ...provided,
                      color: "hsl(var(--muted-foreground))",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: "hsl(var(--muted-foreground))",
                      strokeWidth: 1,
                    }),
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full px-4 font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={!isNewTransaction}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={TransactionType.EXPENSE} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(TransactionType).map((option, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={option as TransactionType}
                      >{transactionMapper[option as TransactionType].label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de Pagamento</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={!isNewTransaction}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={PaymentMethod.TRANSFER} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={PaymentMethod.TRANSFER}>Transferência</SelectItem>
                  <SelectItem value={PaymentMethod.CREDIT}>Crédito</SelectItem>
                  <SelectItem value={PaymentMethod.DEBIT}>Débito</SelectItem>
                  <SelectItem value={PaymentMethod.PIX}>PIX</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          isLoading={isLoading || isCreatingRecurringTransaction || isUpdatingRecurringTransaction}
        >Adicionar</Button>
      </form>
    </Form>
  )
}

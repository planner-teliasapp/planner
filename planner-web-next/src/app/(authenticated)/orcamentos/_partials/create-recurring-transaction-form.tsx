/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { PaymentMethod, TransactionFrequency, TransactionType } from "@prisma/client"
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
import { CreateRecurringTransactionDto, CreateTransactionDto } from "@/models/transaction"
import { useBudgets } from "@/hooks/use-budgets"
import { useEffect, useMemo } from "react"

const formSchema = z.object({
  description: z.string().min(2).max(255),
  referenceValue: z.union([
    z.string().refine((value) => parseFloat(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseFloat(value)),
    z.number().positive(),
  ]),
  type: z.nativeEnum(TransactionType),
  paymentMethod: z.nativeEnum(PaymentMethod),
  startDate: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]),
  endDate: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]).optional(),
  frequency: z.nativeEnum(TransactionFrequency),
  expectedDayOfMonth: z.union([
    z.string()
      .refine((value) => parseInt(value) >= 1 && parseInt(value) <= 28, {
        message: "O valor deve estar entre 1 e 28",
      })
      .transform((value) => parseInt(value)),
    z.number().min(1).max(28),
  ]).optional(),
  expectedDayOfWeek: z.number().min(0).max(6).optional(),
  expectedMonthOfYear: z.number().min(0).max(11).optional(),
})

interface Props {
  onSubmit?: (data: CreateRecurringTransactionDto) => void
  isLoading?: boolean
}

export default function CreateRecurringTransactionForm({ onSubmit, isLoading }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      referenceValue: 0,
      type: TransactionType.EXPENSE,
      paymentMethod: PaymentMethod.TRANSFER,
      startDate: new Date(),
      frequency: TransactionFrequency.MONTHLY,
      expectedDayOfMonth: 15,
    },
  })

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit && onSubmit(values)

    // console.log(values)
  }

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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referenceValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor de Referência</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={TransactionType.EXPENSE} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TransactionType.EXPENSE}>Despesa</SelectItem>
                  <SelectItem value={TransactionType.INCOME}>Receita</SelectItem>
                  <SelectItem value={TransactionType.INVESTMENT}>Investimento</SelectItem>
                  <SelectItem value={TransactionType.PENSION}>Previdência</SelectItem>
                  <SelectItem value={TransactionType.WALLET}>Caixinha</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
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
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Inicia em</FormLabel>
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
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Finaliza em (opcional)</FormLabel>
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
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recorrência</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={TransactionFrequency.MONTHLY} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TransactionFrequency.DAILY}>Diária</SelectItem>
                  <SelectItem value={TransactionFrequency.WEEKLY}>Semanal</SelectItem>
                  <SelectItem value={TransactionFrequency.MONTHLY}>Mensal</SelectItem>
                  <SelectItem value={TransactionFrequency.YEARLY}>Anual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectedDayOfMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dia do Mês</FormLabel>
              <FormControl>
                <Input
                  type="number" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectedMonthOfYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mês do Ano</FormLabel>
              <FormControl>
                <Input
                  type="number" {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" isLoading={isLoading}>Adicionar</Button>
      </form>
    </Form>
  )
}

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateRecurringTransactionDto } from "@/models/transaction"
import { months, weekdays } from "@/lib/constants"
import { ClassNameValue } from "tailwind-merge"
import { paymentFrequencyMapper, transactionMapper } from "../_utils"

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
  expectedDayOfWeek: z.union([
    z.number().min(0).max(6),
    z.string()
      .refine((value) => parseInt(value) >= 0 && parseInt(value) <= 6, {
        message: "O valor deve estar entre 0 e 6",
      })
      .transform((value) => parseInt(value)),
  ]).optional(),
  expectedMonthOfYear: z.union([
    z.number().min(0).max(11),
    z.string()
      .refine((value) => parseInt(value) >= 0 && parseInt(value) <= 11, {
        message: "O valor deve estar entre 0 e 11",
      })
      .transform((value) => parseInt(value)),
  ]).optional(),
})

interface Props {
  onSubmit?: (data: CreateRecurringTransactionDto) => void
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CreateRecurringTransactionForm({ onSubmit, isLoading, className }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      referenceValue: 0,
      type: TransactionType.EXPENSE,
      paymentMethod: PaymentMethod.TRANSFER,
      startDate: new Date(),
      frequency: TransactionFrequency.DAILY
    },
  })

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit && onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className={cn("space-y-4", className)}>
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
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recorrência</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={TransactionFrequency.DAILY} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={TransactionFrequency.DAILY}>{paymentFrequencyMapper.DAILY.label}</SelectItem>
                  <SelectItem value={TransactionFrequency.WEEKLY}>{paymentFrequencyMapper.WEEKLY.label}</SelectItem>
                  <SelectItem value={TransactionFrequency.MONTHLY}>{paymentFrequencyMapper.MONTHLY.label}</SelectItem>
                  <SelectItem value={TransactionFrequency.YEARLY}>{paymentFrequencyMapper.YEARLY.label}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("frequency") !== TransactionFrequency.DAILY && (
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
        )}
        {form.watch("frequency") !== TransactionFrequency.DAILY && (
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
        )}
        {form.watch("frequency") === TransactionFrequency.WEEKLY && (
          <FormField
            control={form.control}
            name="expectedDayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia da Semana</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={0} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weekdays.map((weekday) => (
                        <SelectItem key={weekday.value} value={weekday.value.toString()}>{weekday.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.watch("frequency") === TransactionFrequency.MONTHLY && (
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
        )}
        {form.watch("frequency") === TransactionFrequency.YEARLY && (
          <FormField
            control={form.control}
            name="expectedMonthOfYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês do Ano</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={0} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="w-full" type="submit" isLoading={isLoading}>Adicionar</Button>
      </form>
    </Form>
  )
}

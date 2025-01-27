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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Trash2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction, UpdateTransactionDto } from "@/models/transaction"
import { transactionMapper } from "../_utils"
import { useBudget } from "@/hooks/use-budget"
import { ScrollArea } from "@/components/ui/scroll-area"

const formSchema = z.object({
  description: z.string(),
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
  transaction: Transaction | undefined
  handleUpdate?: (data: UpdateTransactionDto) => void
  handleDelete?: (id: string) => void
  isLoading?: boolean
  year?: number
  month?: number
}

export default function UpdateTransactionForm({ handleUpdate, handleDelete, isLoading, transaction, year = new Date().getFullYear(), month = new Date().getMonth() + 1 }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction?.description,
      amount: transaction?.amount,
      date: transaction?.date,
      type: transaction?.type,
      paymentMethod: transaction?.paymentMethod,
    },
  })

  const { updateTransaction, isUpdatingTransaction, deleteTransaction, isDeletingTransaction } = useBudget({ year, month })

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    if (handleUpdate) {
      handleUpdate({
        id: transaction?.id || "",
        ...values
      })
    } else {
      await updateTransaction({
        id: transaction?.id || "",
        ...values
      })
    }
  }

  async function onDelete() {
    if (handleDelete) {
      handleDelete(transaction?.id || "")
    } else {
      await deleteTransaction(transaction?.id || "")
    }
  }

  return (
    <Form {...form}>
      <ScrollArea className="h-[98%] pr-4">
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
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
                  disabled
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
                  disabled
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
            isLoading={isLoading || isUpdatingTransaction}
          >Atualizar</Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            isLoading={isLoading || isDeletingTransaction}
            onClick={onDelete}
          >
            <Trash2Icon /> Excluir
          </Button>
        </form>
      </ScrollArea>
    </Form>
  )
}

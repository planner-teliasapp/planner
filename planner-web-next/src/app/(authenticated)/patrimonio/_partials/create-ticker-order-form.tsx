/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TickerOrderType } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AutoCompleteSelect from "react-select"
import { tickerOrderTypeMapper } from "../_utils"
import { CreateTickerOrderDto } from "@/models/assets/ticker-order"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { useAssets } from "@/hooks/use-assets"
import { useMemo } from "react"

const formSchema = z.object({
  ticker: z.object({
    label: z.string().min(2).max(50),
    value: z.string().min(2).max(50)
  }),
  type: z.nativeEnum(TickerOrderType),
  quantity: z.union([
    z.string().refine((value) => parseInt(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseInt(value)),
    z.number().int().positive(),
  ]),
  price: z.union([
    z.string().refine((value) => parseFloat(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseFloat(value)),
    z.number().positive(),
  ]),
  date: z.union([
    z.string().date().transform((data) => new Date(data)),
    z.string().datetime().transform((data) => new Date(data)),
    z.date(),
  ]).optional(),
})

interface Props {
  onSubmit?: (data: CreateTickerOrderDto) => void
  isLoading?: boolean
}

export default function CreateTickerOrderForm({ onSubmit, isLoading }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: {
        label: "",
        value: "",
      },
      type: TickerOrderType.BUY,
      quantity: 0,
      price: 0,
      date: new Date(),
    },
  })

  const { tickers, isLoadingTickers } = useAssets()

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit && onSubmit({
      ...values,
      ticker: values.ticker.value,
    })
  }

  const orderTypeOptions = Object.keys(TickerOrderType).map((option, index) => {
    return Object.keys(TickerOrderType)[index] as TickerOrderType
  })

  const tickerOptions = useMemo(() => {
    return tickers?.map((ticker) => ({
      label: ticker.symbol,
      value: ticker.symbol
    }))
  }, [tickers])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <AutoCompleteSelect
                  isLoading={isLoadingTickers}
                  autoFocus
                  isClearable
                  options={tickerOptions}
                  placeholder=""
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orderTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {tickerOrderTypeMapper[option].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  {...field}
                />
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

        <Button className="w-full" type="submit" isLoading={isLoading}>Adicionar</Button>
      </form>
    </Form>
  )
}

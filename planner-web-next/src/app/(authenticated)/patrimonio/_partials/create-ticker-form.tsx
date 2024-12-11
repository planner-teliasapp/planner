/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { TickerType } from "@prisma/client"
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
import { CreateTickerDto } from "@/models/assets/ticker"
import { tickerTypeMapper } from "../_utils"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  symbol: z.string().min(1, { message: "O campo é obrigatório" }),
  name: z.string().min(1, { message: "O campo é obrigatório" }),
  type: z.nativeEnum(TickerType),
  price: z.union([
    z.string().refine((value) => parseFloat(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseFloat(value)),
    z.number().positive(),
  ]),
  autoUpdate: z.boolean(),
})

interface Props {
  onSubmit?: (data: CreateTickerDto) => void
  isLoading?: boolean
}

export default function CreateTickerForm({ onSubmit, isLoading }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      name: "",
      type: TickerType.STOCK,
      price: 0,
      autoUpdate: false,
    },
  })

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit && onSubmit(values)
  }

  const tickerTypeOptions = Object.keys(TickerType).map((option, index) => {
    return Object.keys(TickerType)[index] as TickerType
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
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
                  {tickerTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {tickerTypeMapper[option].label}
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
          name="price"
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
          name="autoUpdate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-row justify-between items-center">
              <FormLabel className="text-base">
                Atualização automática?
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" isLoading={isLoading}>Adicionar</Button>
      </form>
    </Form>
  )
}

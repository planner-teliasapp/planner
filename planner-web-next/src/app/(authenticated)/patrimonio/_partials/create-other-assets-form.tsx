/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { OthersAssetsTypes } from "@prisma/client"
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
import { otherAssetsTypeMapper } from "../_utils"
import { ICreateOtherAssetDto } from "@/models/assets/other-asset"

const formSchema = z.object({
  description: z.string().min(2).max(50),
  value: z.union([
    z.string().refine((value) => parseFloat(value) > 0, {
      message: "O valor deve ser maior que 0",
    }).transform((value) => parseFloat(value)),
    z.number().positive(),
  ]),
  type: z.nativeEnum(OthersAssetsTypes),
})

interface Props {
  onSubmit?: (data: ICreateOtherAssetDto) => void
  isLoading?: boolean
  defaultType?: OthersAssetsTypes
}

export default function CreateOtherAssetsForm({ onSubmit, isLoading, defaultType = OthersAssetsTypes.CASH_BOX }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      value: 0,
      type: defaultType,
    },
  })

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit && onSubmit(values)
  }

  const options = Object.keys(OthersAssetsTypes).map((option, index) => {
    return Object.keys(OthersAssetsTypes)[index] as OthersAssetsTypes
  })

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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor / Saldo</FormLabel>
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
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {otherAssetsTypeMapper[option].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" isLoading={isLoading}>Adicionar</Button>
      </form>
    </Form>
  )
}

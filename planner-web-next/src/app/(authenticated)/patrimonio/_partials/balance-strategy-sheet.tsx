"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChartPieIcon } from "lucide-react"

import { z } from "@/lib/pt-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { formatPercentage } from "@/lib/utils"
import { useAssets } from "@/hooks/use-assets"

const formSchema = z.object({
  cashBox: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  fixedIncome: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  pension: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  property: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  share: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  reit: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  international: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  gold: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  crypto: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ])
})

export default function BalanceStrategySheet() {
  const { updateAssetStrategy, balanceStrategy } = useAssets()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [totalPercentage, setTotalPercentage] = useState(0)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cashBox: undefined,
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(totalPercentage)
    if (totalPercentage !== 1) {
      toast({
        title: "A soma dos valores precisa ser 100%",
        variant: "destructive"
      })
      return
    }

    try {
      await updateAssetStrategy(values)
      toast({
        title: "Salvo com sucesso",
      })
      setIsSheetOpen(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao salvar",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    const values = form.getValues()
    const total = Object.values(values).reduce((acc, curr) => {
      const value = Number(curr?.toString().replace(",", "."))
      return acc + (value || 0)
    }, 0)
    setTotalPercentage((total - (balanceStrategy?.variableIncome || 0)) / 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch(), balanceStrategy])

  useEffect(() => {
    if (balanceStrategy) {
      form.reset(balanceStrategy)
    }
  }, [balanceStrategy, form])


  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className={buttonVariants({ className: "w-full sm:w-auto" })}><ChartPieIcon />Definir Estratégia</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Estratégia de Balanceamento</SheetTitle>
          <p>Total Distribuído: {formatPercentage(totalPercentage)}</p>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-6 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="cashBox"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Caixa</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fixedIncome"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Renda Fixa</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="share"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Ações</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reit"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Fiis</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="international"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Internacional</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gold"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Ouro</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crypto"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Criptomoeda</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pension"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Previdência</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem>
                  <div className="w-full flex flex-row justify-between items-center gap-4">
                    <FormLabel>Propriedades</FormLabel>
                    <FormControl>
                      <div className="relative w-28">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="w-full sm:w-fit sm:px-10 self-center"
            >Salvar</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

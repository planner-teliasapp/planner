"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"
import { ICreateFixedIncomeDto } from "@/models/assets/fixed-income"
import CreateFixedIncomeForm from "./create-fixed-income-form"

interface Props {
  onSubmit: (data: ICreateFixedIncomeDto) => void
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CreateFixedIncomeButton({ onSubmit, isLoading, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(data: ICreateFixedIncomeDto) {
    if (onSubmit) {
      try {
        await onSubmit(data)
        setIsOpen(false)
      } catch (error) {

      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className={cn("w-full sm:w-fit", className)}>
          <span>Adicionar</span>
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar nova Renda Fixa</SheetTitle>
        </SheetHeader>
        <CreateFixedIncomeForm onSubmit={handleSubmit} isLoading={isLoading} />
      </SheetContent>
    </Sheet>
  )
}

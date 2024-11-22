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
import CreateTransactionForm from "./create-transaction-form"
import { useState } from "react"
import { CreateTransactionDto } from "@/models/transaction"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"

interface Props {
  onSubmit: (data: CreateTransactionDto) => void
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CreateTransactionButton({ onSubmit, isLoading, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(data: CreateTransactionDto) {
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
          <SheetTitle>Adicionar nova transação</SheetTitle>
        </SheetHeader>
        <CreateTransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </SheetContent>
    </Sheet>
  )
}

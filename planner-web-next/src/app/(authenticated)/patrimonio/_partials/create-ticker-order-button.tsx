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
import { CreateTickerOrderDto } from "@/models/assets/ticker-order"
import CreateTickerOrderForm from "./create-ticker-order-form"

interface Props {
  onSubmit: (data: CreateTickerOrderDto) => void
  isLoading?: boolean
  className?: ClassNameValue
}

export default function CreateTickerOrderButton({ onSubmit, isLoading, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(data: CreateTickerOrderDto) {
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
          <SheetTitle>Adicionar nova Ordem</SheetTitle>
        </SheetHeader>
        <CreateTickerOrderForm onSubmit={handleSubmit} isLoading={isLoading} />
      </SheetContent>
    </Sheet>
  )
}

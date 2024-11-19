"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"
import CreateTransactionForm from "./create-transaction-form"
import { useState } from "react"


export default function CreateTransactionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="w-full sm:w-fit">
          <span>Adicionar</span>
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar nova transação</SheetTitle>
        </SheetHeader>
        <CreateTransactionForm onSuccessfulSubmit={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>

  )
}

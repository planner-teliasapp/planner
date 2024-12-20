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
import { ICreateOtherAssetDto } from "@/models/assets/other-asset"
import CreateOtherAssetsForm from "./create-other-assets-form"
import { OthersAssetsTypes } from "@prisma/client"

interface Props {
  onSubmit: (data: ICreateOtherAssetDto) => void
  isLoading?: boolean
  className?: ClassNameValue
  defaultType?: OthersAssetsTypes
}

export default function CreateOtherAssetsButton({ onSubmit, isLoading, className, defaultType }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  async function handleSubmit(data: ICreateOtherAssetDto) {
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
          <SheetTitle>Adicionar novo Patrimônio</SheetTitle>
        </SheetHeader>
        <CreateOtherAssetsForm onSubmit={handleSubmit} isLoading={isLoading} defaultType={defaultType} />
      </SheetContent>
    </Sheet>
  )
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validatedYear(year: number | string | undefined): number | null {
  const parsedYear = Number(year)
  if (isNaN(parsedYear)) {
    return null
  } else if (parsedYear < 1900 || parsedYear > 2100) {
    return null
  }

  return parsedYear
}

export function validatedMonth(month: number | string | undefined): number | null {
  const parsedMonth = Number(month)
  if (isNaN(parsedMonth)) {
    return null
  } else if (parsedMonth < 1 || parsedMonth > 12) {
    return null
  }

  return parsedMonth
}

export function convertIntToMonth(month: number): string {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ]

  return months[month - 1]
}

export function formatCurrency(value: number = 0) {
  return `R$ ${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)}`
}
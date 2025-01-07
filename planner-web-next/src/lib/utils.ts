import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { months, weekdays } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validatedYear(year: number | string | undefined | null): number | null {
  const parsedYear = Number(year)
  if (isNaN(parsedYear)) {
    return null
  } else if (parsedYear < 1900 || parsedYear > 2100) {
    return null
  }

  return parsedYear
}

export function validatedMonth(month: number | string | undefined | null): number | null {
  const parsedMonth = Number(month)
  if (isNaN(parsedMonth)) {
    return null
  } else if (parsedMonth < 1 || parsedMonth > 12) {
    return null
  }

  return parsedMonth
}

export function convertHumanIntToMonth(month: number): string {
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

export function convertIntToMonth(month: number): string {
  return months[month].label
}

export function convertIntToWeekday(weekday: number): string {
  return weekdays[weekday].label
}

export function formatCurrency(value: number = 0) {
  return `R$ ${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)}`
}

interface FormatPercentageOptions {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  appendSignage?: boolean
}

export function formatPercentage(value: number = 0, options?: FormatPercentageOptions) {
  const signage = options?.appendSignage ? (value < 0 ? "" : "+") : ""

  return `${signage}${Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: options?.minimumFractionDigits || 2,
    maximumFractionDigits: options?.maximumFractionDigits || 2
  }).format(value)}`
}
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "€0,00"
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export function formatDate(date: string | Date | undefined | null): string {
  if (!date) {
    return "Data inválida"
  }

  try {
    const d = typeof date === "string" ? new Date(date) : date
    if (isNaN(d.getTime())) {
      return "Data inválida"
    }
    return d.toLocaleDateString("pt-PT")
  } catch (error) {
    return "Data inválida"
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "cancelled":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "paid":
      return "Pago"
    case "pending":
      return "Pendente"
    case "overdue":
      return "Em Atraso"
    case "cancelled":
      return "Cancelado"
    default:
      return status
  }
}

export function safeNumber(value: any): number {
  if (typeof value === "number" && !isNaN(value)) {
    return value
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

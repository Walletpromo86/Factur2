"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useData } from "@/contexts/data-context"
import { formatCurrency, safeNumber } from "@/lib/utils"
import { FileText, Users, Truck, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export function DashboardStats() {
  const { invoices, suppliers, transporters } = useData()

  const totalInvoices = invoices.length
  const totalSuppliers = suppliers.length
  const totalTransporters = transporters.length

  const totalAmount = invoices.reduce((sum, invoice) => {
    return sum + safeNumber(invoice.total)
  }, 0)

  const pendingInvoices = invoices.filter((invoice) => invoice.status === "pending").length
  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid").length
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "overdue").length

  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + safeNumber(invoice.total), 0)

  const paidAmount = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + safeNumber(invoice.total), 0)

  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + safeNumber(invoice.total), 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Faturas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <p className="text-xs text-muted-foreground">Valor total: {formatCurrency(totalAmount)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSuppliers}</div>
          <p className="text-xs text-muted-foreground">Fornecedores ativos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transportadoras</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransporters}</div>
          <p className="text-xs text-muted-foreground">Transportadoras ativas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturas Pagas</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{paidInvoices}</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(paidAmount)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingInvoices}</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(pendingAmount)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Faturas Vencidas</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{overdueInvoices}</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(overdueAmount)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/contexts/data-context"
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils"

export function RecentInvoices() {
  const { invoices } = useData()

  const recentInvoices = invoices
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturas Recentes</CardTitle>
        <CardDescription>As últimas 5 faturas criadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{invoice.number}</p>
                <p className="text-sm text-muted-foreground">{invoice.supplier}</p>
                <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(invoice.total)}</p>
                <Badge className={getStatusColor(invoice.status)}>{getStatusLabel(invoice.status)}</Badge>
              </div>
            </div>
          ))}
          {recentInvoices.length === 0 && (
            <p className="text-center text-muted-foreground py-4">Nenhuma fatura encontrada</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

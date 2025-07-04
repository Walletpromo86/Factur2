"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "@/contexts/data-context"
import { formatCurrency, formatDate } from "@/lib/utils"

export function UpcomingPayments() {
  const { invoices } = useData()

  const upcomingPayments = invoices
    .filter((invoice) => invoice.status === "pending")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Pagamentos</CardTitle>
        <CardDescription>Faturas pendentes por ordem de vencimento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPayments.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{invoice.number}</p>
                <p className="text-sm text-muted-foreground">{invoice.supplier}</p>
                <p className="text-xs text-muted-foreground">Vence: {formatDate(invoice.dueDate)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(invoice.total)}</p>
                <Badge variant="secondary">Pendente</Badge>
              </div>
            </div>
          ))}
          {upcomingPayments.length === 0 && (
            <p className="text-center text-muted-foreground py-4">Nenhum pagamento pendente</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

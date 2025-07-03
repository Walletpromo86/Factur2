"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import { MainNavigation } from "@/components/main-navigation"
import { ExportReportsButton } from "@/components/export-reports-button"
import { useData } from "@/contexts/data-context"
import { useEffect, useState } from "react"

export const dynamic = "force-dynamic"

export default function InvoicesPage() {
  const [mounted, setMounted] = useState(false)
  const { invoices } = useData()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <MainNavigation />
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">A carregar...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavigation />
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Faturas
          </h1>
          <div className="flex items-center gap-2">
            <ExportReportsButton invoices={invoices} />
            <Link href="/invoices/new">
              <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Nova Fatura
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neon-purple" />
            <Input
              type="search"
              placeholder="Pesquisar faturas..."
              className="w-full pl-8 bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>

        <Card className="futuristic-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b-neon-purple/20 hover:bg-muted/30">
                  <TableHead className="text-neon-blue">Referência</TableHead>
                  <TableHead className="text-neon-blue">Fornecedor</TableHead>
                  <TableHead className="text-neon-blue">Tipo</TableHead>
                  <TableHead className="text-neon-blue">Data</TableHead>
                  <TableHead className="text-neon-blue">Vencimento</TableHead>
                  <TableHead className="text-neon-blue">Valor</TableHead>
                  <TableHead className="text-neon-blue">Estado</TableHead>
                  <TableHead className="text-right text-neon-blue">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.supplier}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          invoice.entityType === "supplier"
                            ? "border-neon-blue text-neon-blue"
                            : "border-neon-cyan text-neon-cyan"
                        }
                      >
                        {invoice.entityType === "supplier" ? "🏢 Fornecedor" : "🚛 Transportadora"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString("pt-PT")}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString("pt-PT")}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={invoice.status === "paid" ? "outline" : "secondary"}
                        className={
                          invoice.status === "paid"
                            ? "border-neon-green text-neon-green"
                            : "bg-neon-purple/20 text-neon-purple"
                        }
                      >
                        {invoice.status === "paid" ? "Pago" : "Pendente"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/invoices/${invoice.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

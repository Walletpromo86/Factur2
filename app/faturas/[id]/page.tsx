"use client"

import { useParams } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useData } from "@/contexts/data-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

export default function InvoiceDetailPage() {
  const params = useParams()
  const { invoices } = useData()
  const invoiceId = params.id as string

  const invoice = invoices.find((inv) => inv.id === invoiceId)

  if (!invoice) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Fatura não encontrada</h1>
                  <Button asChild>
                    <Link href="/faturas">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar às Faturas
                    </Link>
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paga</Badge>
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>
      case "overdue":
        return <Badge variant="destructive">Atrasada</Badge>
      case "cancelled":
        return <Badge variant="outline">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/faturas">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{invoice.number}</h1>
                    <p className="text-gray-600">Detalhes da fatura</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/faturas/${invoice.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações da Fatura</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Número</p>
                          <p className="text-lg font-semibold">{invoice.number}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Estado</p>
                          <div className="mt-1">{getStatusBadge(invoice.status)}</div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Data da Fatura</p>
                          <p className="text-lg">{new Date(invoice.date).toLocaleDateString("pt-PT")}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Data de Vencimento</p>
                          <p className="text-lg">{new Date(invoice.dueDate).toLocaleDateString("pt-PT")}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Fornecedor</p>
                        <p className="text-lg font-semibold">{invoice.supplier}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Descrição</p>
                        <p className="text-gray-900">{invoice.description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Itens da Fatura</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {invoice.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{item.description}</p>
                              <p className="text-sm text-gray-600">
                                Quantidade: {item.quantity} × €{item.unitPrice.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold">€{item.total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumo Financeiro</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>€{invoice.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IVA (23%):</span>
                        <span>€{(invoice.amount * 0.23).toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>€{(invoice.amount * 1.23).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ações</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full" asChild>
                        <Link href={`/faturas/${invoice.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Fatura
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Imprimir PDF
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Enviar por Email
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

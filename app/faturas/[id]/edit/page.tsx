"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useData } from "@/contexts/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function EditInvoicePage() {
  const params = useParams()
  const router = useRouter()
  const { invoices, updateInvoice, suppliers } = useData()
  const { toast } = useToast()
  const invoiceId = params.id as string

  const [formData, setFormData] = useState({
    number: "",
    date: "",
    dueDate: "",
    supplier: "",
    amount: 0,
    status: "pending" as const,
    description: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [invoice, setInvoice] = useState(invoices.find((inv) => inv.id === invoiceId))

  useEffect(() => {
    const foundInvoice = invoices.find((inv) => inv.id === invoiceId)
    if (foundInvoice) {
      setInvoice(foundInvoice)
      setFormData({
        number: foundInvoice.number,
        date: foundInvoice.date,
        dueDate: foundInvoice.dueDate,
        supplier: foundInvoice.supplier,
        amount: foundInvoice.amount,
        status: foundInvoice.status,
        description: foundInvoice.description,
      })
    }
  }, [invoiceId, invoices])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateInvoice(invoiceId, {
        ...formData,
        items: [
          {
            id: "1",
            description: formData.description,
            quantity: 1,
            unitPrice: formData.amount,
            total: formData.amount,
          },
        ],
        total: formData.amount,
      })

      toast({
        title: "Fatura atualizada",
        description: `A fatura ${formData.number} foi atualizada com sucesso.`,
      })

      router.push(`/faturas/${invoiceId}`)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar a fatura. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/faturas/${invoiceId}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Editar Fatura</h1>
                  <p className="text-gray-600">Editar os dados da fatura {invoice.number}</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhes da Fatura</CardTitle>
                  <CardDescription>Altere os dados da fatura</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número da Fatura</Label>
                        <Input
                          id="number"
                          value={formData.number}
                          onChange={(e) => handleInputChange("number", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="supplier">Fornecedor</Label>
                        <Select
                          value={formData.supplier}
                          onValueChange={(value) => handleInputChange("supplier", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar fornecedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.name}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Data da Fatura</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Data de Vencimento</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={formData.dueDate}
                          onChange={(e) => handleInputChange("dueDate", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount">Valor (€)</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.amount}
                          onChange={(e) => handleInputChange("amount", Number.parseFloat(e.target.value) || 0)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Estado</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="paid">Paga</SelectItem>
                            <SelectItem value="overdue">Atrasada</SelectItem>
                            <SelectItem value="cancelled">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Descrição dos serviços ou produtos..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" asChild>
                        <Link href={`/faturas/${invoiceId}`}>Cancelar</Link>
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>A
                            guardar...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Alterações
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

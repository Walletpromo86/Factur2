"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { DocumentList } from "@/components/document-list"
import { Separator } from "@/components/ui/separator"
import { useData } from "@/contexts/data-context"

interface InvoicePageProps {
  params: {
    id: string
  }
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const router = useRouter()
  const { getInvoice, deleteInvoice } = useData()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const invoice = getInvoice(params.id)

  if (!invoice) {
    return (
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Fatura não encontrada</h1>
        </div>
      </div>
    )
  }

  // Função para apagar fatura
  const handleDelete = () => {
    setIsDeleting(true)

    // Simulação de uma operação de exclusão
    setTimeout(() => {
      deleteInvoice(params.id)
      setIsDeleting(false)
      setShowDeleteConfirm(false)

      // Mostrar notificação de sucesso
      showNotification("✅ Fatura apagada com sucesso!")

      // Redirecionar para a lista de faturas
      router.push("/invoices")
    }, 1500)
  }

  // Função para mostrar notificação
  const showNotification = (message: string) => {
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-gradient-to-r from-neon-purple to-neon-blue text-white p-4 rounded-md shadow-lg z-50"
    notification.innerHTML = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add("fade-out")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 500)
    }, 3000)
  }

  // Dados simulados dos documentos para esta fatura específica
  const documents = {
    supplierInvoice: [{ id: "1", name: "fatura-fornecedor-001.pdf", type: "pdf", size: 1240000 }],
    bankProof: [{ id: "2", name: "comprovativo-banco.pdf", type: "pdf", size: 890000 }],
    paypalProof: [],
    transporterInvoice: [{ id: "3", name: "fatura-transportadora.pdf", type: "pdf", size: 750000 }],
    transporterPayment: [{ id: "4", name: "comprovativo-pagamento-transportadora.jpg", type: "image", size: 2500000 }],
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{invoice.id}</h1>
          <Badge
            variant={invoice.status === "paid" ? "outline" : "secondary"}
            className={
              invoice.status === "paid" ? "border-neon-green text-neon-green" : "bg-neon-purple/20 text-neon-purple"
            }
          >
            {invoice.status === "paid" ? "Pago" : "Pendente"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="futuristic-card">
          <CardHeader>
            <CardTitle className="text-neon-purple neon-text">Detalhes da Fatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-neon-blue">Fornecedor</p>
                <p className="font-medium">{invoice.supplier}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neon-blue">Tipo</p>
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
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-neon-blue">Descrição</p>
                <p className="font-medium">{invoice.description}</p>
              </div>
            </div>

            <Separator className="bg-neon-purple/20" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-neon-blue">Data da Fatura</p>
                <p className="font-medium">{new Date(invoice.date).toLocaleDateString("pt-PT")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neon-blue">Data de Vencimento</p>
                <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString("pt-PT")}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neon-blue">Valor</p>
                <p className="text-xl font-bold">{formatCurrency(invoice.amount)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neon-blue">Estado</p>
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
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Documentos</CardTitle>
              <CardDescription>Documentos organizados por categoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-neon-blue mb-2">Factura Fornecedor</h4>
                <DocumentList documents={documents.supplierInvoice} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neon-blue mb-2">Comprovativo Banco</h4>
                <DocumentList documents={documents.bankProof} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neon-blue mb-2">Comprovativo PayPal</h4>
                <DocumentList documents={documents.paypalProof} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neon-blue mb-2">Factura Transportadora</h4>
                <DocumentList documents={documents.transporterInvoice} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-neon-blue mb-2">Comprovativo Pagamento Transportadora</h4>
                <DocumentList documents={documents.transporterPayment} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-6">
              Tem certeza que deseja apagar a fatura <span className="font-bold">{invoice.id}</span>? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600"
              >
                {isDeleting ? "A apagar..." : "Sim, apagar"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s;
        }
      `}</style>
    </div>
  )
}

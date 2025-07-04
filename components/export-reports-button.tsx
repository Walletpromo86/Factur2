"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, FileSpreadsheet, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Invoice {
  id: string
  supplier: string
  date: string
  dueDate: string
  amount: number
  status: string
  entityType: string
  description?: string
  files?: {
    supplier: any[]
    transporter: any[]
  }
}

interface ExportReportsButtonProps {
  invoices: Invoice[]
}

export function ExportReportsButton({ invoices }: ExportReportsButtonProps) {
  const [open, setOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [includeDocuments, setIncludeDocuments] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState<"pdf" | "excel" | null>(null)

  // Filtrar faturas com base no status selecionado
  const filteredInvoices = invoices.filter((invoice) => {
    if (statusFilter === "all") return true
    return invoice.status === statusFilter
  })

  // Calcular totais para o resumo
  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = filteredInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = filteredInvoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  // Contar documentos
  const documentCount = filteredInvoices.reduce((count, invoice) => {
    const supplierDocs = invoice.files?.supplier?.length || 0
    const transporterDocs = invoice.files?.transporter?.length || 0
    return count + supplierDocs + transporterDocs
  }, 0)

  // Simular exportação
  const handleExport = async (type: "pdf" | "excel") => {
    setExportType(type)
    setIsExporting(true)

    try {
      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular download
      const fileName = `faturas-exportadas-${new Date().toISOString().split("T")[0]}.${type === "pdf" ? "pdf" : "xlsx"}`

      // Criar um elemento de notificação para simular o download
      const notification = document.createElement("div")
      notification.className =
        "fixed top-4 right-4 bg-neon-green/90 text-white p-4 rounded-md shadow-lg z-50 flex items-center gap-2"
      notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div>
          <p class="font-bold">Download iniciado!</p>
          <p class="text-sm">${fileName}</p>
        </div>
      `
      document.body.appendChild(notification)

      // Remover a notificação após alguns segundos
      setTimeout(() => {
        notification.remove()
      }, 3000)

      // Fechar o modal
      setOpen(false)
    } catch (error) {
      console.error("Erro ao exportar:", error)
    } finally {
      setIsExporting(false)
      setExportType(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatórios
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900 to-slate-800 border-neon-purple/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Exportar Relatórios
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Filtros */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neon-blue">Filtros</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="text-neon-purple">
                  Estado das Faturas
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status" className="border-neon-purple/30 focus:ring-neon-purple/30">
                    <SelectValue placeholder="Selecionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as faturas</SelectItem>
                    <SelectItem value="paid">Apenas pagas</SelectItem>
                    <SelectItem value="pending">Apenas pendentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-documents"
                  checked={includeDocuments}
                  onCheckedChange={(checked) => setIncludeDocuments(checked as boolean)}
                  className="border-neon-purple data-[state=checked]:bg-neon-purple"
                />
                <Label htmlFor="include-documents" className="text-neon-purple">
                  Incluir documentos anexados
                </Label>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neon-blue">Resumo da Exportação</h3>
            <div className="bg-slate-800/50 p-4 rounded-md border border-neon-purple/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neon-purple">Faturas selecionadas</p>
                  <p className="text-xl font-bold">{filteredInvoices.length}</p>
                </div>
                <div>
                  <p className="text-sm text-neon-purple">Valor total</p>
                  <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-neon-purple">Valor pago</p>
                  <p className="text-xl font-bold text-neon-green">{formatCurrency(paidAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-neon-purple">Valor pendente</p>
                  <p className="text-xl font-bold text-neon-pink">{formatCurrency(pendingAmount)}</p>
                </div>
                {includeDocuments && (
                  <div className="col-span-2">
                    <p className="text-sm text-neon-purple">Documentos incluídos</p>
                    <p className="text-xl font-bold">{documentCount}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botões de exportação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neon-blue">Formato de Exportação</h3>
            <div className="flex gap-4">
              <Button
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
                className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-white"
              >
                {isExporting && exportType === "pdf" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Exportando...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF Completo
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleExport("excel")}
                disabled={isExporting}
                className="flex-1 bg-neon-green hover:bg-neon-green/80 text-white"
              >
                {isExporting && exportType === "excel" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Exportando...
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel Completo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

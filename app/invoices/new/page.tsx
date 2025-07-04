"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
// Atualizar os imports para usar o novo DocumentUploader
import { DocumentUploader, type UploadedFile } from "@/components/document-uploader"

export default function NewInvoicePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Substituir os estados de arquivos por:
  const [supplierInvoiceFiles, setSupplierInvoiceFiles] = useState<UploadedFile[]>([])
  const [bankProofFiles, setBankProofFiles] = useState<UploadedFile[]>([])
  const [paypalProofFiles, setPaypalProofFiles] = useState<UploadedFile[]>([])
  const [transporterInvoiceFiles, setTransporterInvoiceFiles] = useState<UploadedFile[]>([])
  const [transporterPaymentFiles, setTransporterPaymentFiles] = useState<UploadedFile[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to invoices page
    router.push("/invoices")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Link href="/invoices">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Nova Fatura
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Detalhes da Fatura</CardTitle>
              <CardDescription>Preencha os detalhes da fatura do fornecedor ou transportadora.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="invoice-number">Número da Fatura</Label>
                <Input
                  id="invoice-number"
                  placeholder="Ex: FAT-2023-001"
                  required
                  className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="invoice-date">Data da Fatura</Label>
                <Input id="invoice-date" type="date" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="due-date">Data de Vencimento</Label>
                <Input id="due-date" type="date" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Valor (€)</Label>
                <Input id="amount" type="number" step="0.01" min="0" placeholder="0.00" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="entity-type">Tipo de Entidade</Label>
                <Select required>
                  <SelectTrigger id="entity-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Fornecedor</SelectItem>
                    <SelectItem value="transporter">Transportadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="entity">Entidade</Label>
                <Select required>
                  <SelectTrigger id="entity">
                    <SelectValue placeholder="Selecione a entidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc">Materiais ABC</SelectItem>
                    <SelectItem value="xyz">Fornecedor XYZ</SelectItem>
                    <SelectItem value="premium">Materiais Premium</SelectItem>
                    <SelectItem value="rapidos">Transportes Rápidos</SelectItem>
                    <SelectItem value="global">Logística Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Factura Fornecedor</CardTitle>
                <CardDescription>Anexe a fatura original do fornecedor.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Substituir os componentes DocumentUploadField por DocumentUploader */}
                {/* Por exemplo, substituir: */}
                {/*
                <DocumentUploadField
                  fieldName="factura-fornecedor"
                  files={supplierInvoiceFiles}
                  setFiles={setSupplierInvoiceFiles}
                />
                */}
                {/* Por: */}
                <DocumentUploader
                  onUploadComplete={(files) => setSupplierInvoiceFiles((prev) => [...prev, ...files])}
                  entityType="supplier"
                  category="invoice"
                  maxFiles={3}
                />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Comprovativo Banco</CardTitle>
                <CardDescription>Anexe o comprovativo de transferência bancária.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader
                  onUploadComplete={(files) => setBankProofFiles((prev) => [...prev, ...files])}
                  entityType="supplier"
                  category="bank_proof"
                  maxFiles={3}
                />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Comprovativo PayPal</CardTitle>
                <CardDescription>Anexe o comprovativo de pagamento via PayPal.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader
                  onUploadComplete={(files) => setPaypalProofFiles((prev) => [...prev, ...files])}
                  entityType="supplier"
                  category="paypal_proof"
                  maxFiles={3}
                />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Factura Transportadora</CardTitle>
                <CardDescription>Anexe a fatura da empresa de transporte.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader
                  onUploadComplete={(files) => setTransporterInvoiceFiles((prev) => [...prev, ...files])}
                  entityType="transporter"
                  category="invoice"
                  maxFiles={3}
                />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Comprovativo Pagamento Transportadora</CardTitle>
                <CardDescription>Anexe o comprovativo de pagamento à transportadora.</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader
                  onUploadComplete={(files) => setTransporterPaymentFiles((prev) => [...prev, ...files])}
                  entityType="transporter"
                  category="payment_proof"
                  maxFiles={3}
                />
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle className="text-neon-purple neon-text">Notas</CardTitle>
                <CardDescription>Adicione informações adicionais sobre esta fatura.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Notas ou observações sobre esta fatura..."
                  className="min-h-[120px] bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href="/invoices">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="bg-neon-purple hover:bg-neon-purple/80 text-white">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "A guardar..." : "Guardar Fatura"}
          </Button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Eye, Plus } from "lucide-react"

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("supplier")

  const supplierDocuments = [
    {
      id: "1",
      name: "fatura-fornecedor-001.pdf",
      type: "pdf",
      size: "1.2 MB",
      date: "2023-05-15",
      category: "invoice",
    },
    {
      id: "2",
      name: "comprovativo-banco.pdf",
      type: "pdf",
      size: "890 KB",
      date: "2023-05-20",
      category: "payment",
    },
  ]

  const transporterDocuments = [
    {
      id: "3",
      name: "fatura-transportadora.pdf",
      type: "pdf",
      size: "750 KB",
      date: "2023-05-22",
      category: "invoice",
    },
    {
      id: "4",
      name: "comprovativo-pagamento.jpg",
      type: "image",
      size: "2.5 MB",
      date: "2023-05-25",
      category: "payment",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-neon-pink" />
      case "image":
        return <Eye className="h-5 w-5 text-neon-cyan" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Gestão de Documentos
        </h1>
        <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Novo Documento
        </Button>
      </div>

      <Tabs defaultValue="supplier" className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger
            value="supplier"
            className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple"
            onClick={() => setActiveTab("supplier")}
          >
            🏢 Documentos de Fornecedores
          </TabsTrigger>
          <TabsTrigger
            value="transporter"
            className="data-[state=active]:bg-neon-purple/20 data-[state=active]:text-neon-purple"
            onClick={() => setActiveTab("transporter")}
          >
            🚛 Documentos de Transportadoras
          </TabsTrigger>
        </TabsList>

        <TabsContent value="supplier" className="space-y-4">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Upload de Documentos - Fornecedor</CardTitle>
              <CardDescription>Carregue faturas, comprovantes de pagamento e outros documentos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-muted-foreground/25 hover:border-neon-purple/50">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Arraste e solte ficheiros aqui, ou clique para selecionar</p>
                  <p className="text-sm text-muted-foreground">Suporta imagens, PDFs e documentos Office</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Documentos Carregados - Fornecedor</CardTitle>
              <CardDescription>Visualize e gerencie os documentos carregados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {supplierDocuments.map((doc) => (
                  <Card key={doc.id} className="flex items-center justify-between p-3 futuristic-card">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-neon-cyan">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-neon-green">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descarregar</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transporter" className="space-y-4">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Upload de Documentos - Transportadora</CardTitle>
              <CardDescription>Carregue faturas, guias de transporte e outros documentos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-muted-foreground/25 hover:border-neon-purple/50">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Arraste e solte ficheiros aqui, ou clique para selecionar</p>
                  <p className="text-sm text-muted-foreground">Suporta imagens, PDFs e documentos Office</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-neon-purple neon-text">Documentos Carregados - Transportadora</CardTitle>
              <CardDescription>Visualize e gerencie os documentos carregados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {transporterDocuments.map((doc) => (
                  <Card key={doc.id} className="flex items-center justify-between p-3 futuristic-card">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-neon-cyan">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-neon-green">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descarregar</span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

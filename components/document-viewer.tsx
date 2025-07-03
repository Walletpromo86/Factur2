"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Download, Eye, ImageIcon, FileIcon } from "lucide-react"
import Image from "next/image"
import { formatFileSize } from "./document-uploader"

export interface DocumentFile {
  name: string
  size: number
  type: string
  url: string
  entityType?: "supplier" | "transporter"
  category?: string
}

interface DocumentViewerProps {
  documents: DocumentFile[]
  title?: string
  emptyMessage?: string
}

export function DocumentViewer({ documents, title, emptyMessage = "Nenhum documento anexado" }: DocumentViewerProps) {
  const [previewDocument, setPreviewDocument] = useState<DocumentFile | null>(null)

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-neon-cyan" />
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-neon-pink" />
    if (type.includes("word")) return <FileIcon className="h-5 w-5 text-neon-blue" />
    if (type.includes("excel") || type.includes("sheet")) return <FileIcon className="h-5 w-5 text-neon-green" />
    return <FileIcon className="h-5 w-5 text-muted-foreground" />
  }

  const isPreviewable = (type: string) => {
    return type.includes("image") || type.includes("pdf")
  }

  const downloadFile = (document: DocumentFile) => {
    const link = document.url
    const a = window.document.createElement("a")
    a.href = link
    a.download = document.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="space-y-3">
      {title && <h4 className="text-sm font-medium text-neon-blue mb-2">{title}</h4>}

      {documents.length === 0 ? (
        <div className="text-center text-muted-foreground py-4 text-sm border border-dashed border-muted-foreground/30 rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {documents.map((doc, index) => (
            <Card key={index} className="flex items-center justify-between p-3 futuristic-card">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {doc.type.includes("image") ? (
                  <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={doc.url || "/placeholder.svg"}
                      alt={doc.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  getFileIcon(doc.type)
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" title={doc.name}>
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                  {doc.category && (
                    <p className="text-xs text-neon-purple">
                      {doc.entityType === "supplier" ? "Fornecedor" : "Transportadora"} - {doc.category}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {isPreviewable(doc.type) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPreviewDocument(doc)}
                    className="hover:text-neon-cyan"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Visualizar</span>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => downloadFile(doc)} className="hover:text-neon-green">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Descarregar</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!previewDocument} onOpenChange={(open) => !open && setPreviewDocument(null)}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{previewDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            {previewDocument?.type.includes("image") ? (
              <div className="relative w-full max-h-[70vh] flex items-center justify-center">
                <Image
                  src={previewDocument.url || "/placeholder.svg"}
                  alt={previewDocument.name}
                  width={800}
                  height={600}
                  className="object-contain max-h-[70vh]"
                />
              </div>
            ) : previewDocument?.type.includes("pdf") ? (
              <iframe
                src={`${previewDocument.url}#toolbar=0&navpanes=0`}
                className="w-full h-[70vh]"
                title={previewDocument.name}
              />
            ) : null}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => downloadFile(previewDocument!)}>Descarregar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

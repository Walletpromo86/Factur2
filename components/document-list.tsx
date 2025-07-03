import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, ImageIcon } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  size: number
}

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getFileIcon = (type: string) => {
    if (type === "image") return <ImageIcon className="h-5 w-5 text-neon-cyan" />
    return <FileText className="h-5 w-5 text-neon-pink" />
  }

  return (
    <div className="space-y-3">
      {documents.length === 0 ? (
        <div className="text-center text-muted-foreground py-4 text-sm">Nenhum documento anexado</div>
      ) : (
        documents.map((doc) => (
          <Card key={doc.id} className="flex items-center justify-between p-3 futuristic-card">
            <div className="flex items-center gap-3">
              {getFileIcon(doc.type)}
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="hover:text-neon-cyan">
              <Download className="h-4 w-4" />
              <span className="sr-only">Descarregar</span>
            </Button>
          </Card>
        ))
      )}
    </div>
  )
}

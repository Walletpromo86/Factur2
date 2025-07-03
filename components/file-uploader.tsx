"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Upload, X } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface FileUploaderProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export function FileUploader({ files, setFiles }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => [...prev, ...acceptedFiles])
    },
    [setFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
      ".doc,.docx": [],
      ".xls,.xlsx": [],
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-neon-purple bg-neon-purple/5"
            : "border-muted-foreground/25 hover:border-neon-purple/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-neon-purple" />
          <p className="font-medium">
            {isDragActive ? "Solte os ficheiros aqui..." : "Arraste e solte ficheiros aqui, ou clique para selecionar"}
          </p>
          <p className="text-sm text-muted-foreground">Suporta imagens, PDFs e documentos Office</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="flex items-center justify-between p-3 futuristic-card">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-neon-purple" />
                <div>
                  <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="hover:text-neon-pink">
                <X className="h-4 w-4" />
                <span className="sr-only">Remover ficheiro</span>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

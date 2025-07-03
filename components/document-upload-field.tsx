"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Upload, X, ImageIcon, FileIcon } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface DocumentUploadFieldProps {
  fieldName: string
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export function DocumentUploadField({ fieldName, files, setFiles }: DocumentUploadFieldProps) {
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-neon-cyan" />
    } else if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-neon-pink" />
    } else {
      return <FileIcon className="h-5 w-5 text-neon-blue" />
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-neon-purple bg-neon-purple/10 shadow-[0_0_20px_rgba(138,43,226,0.3)]"
            : "border-muted-foreground/25 hover:border-neon-purple/50 hover:bg-neon-purple/5"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className={`h-6 w-6 ${isDragActive ? "text-neon-purple" : "text-muted-foreground"}`} />
          <p className="text-sm font-medium">
            {isDragActive ? "Solte os ficheiros aqui..." : "Clique ou arraste ficheiros"}
          </p>
          <p className="text-xs text-muted-foreground">PDF, Imagens, Word, Excel</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-neon-blue">
            {files.length} ficheiro{files.length > 1 ? "s" : ""} anexado{files.length > 1 ? "s" : ""}
          </p>
          {files.map((file, index) => (
            <Card key={index} className="flex items-center justify-between p-3 futuristic-card">
              <div className="flex items-center gap-3">
                {getFileIcon(file)}
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate max-w-[200px]" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                className="hover:text-neon-pink hover:bg-neon-pink/10 flex-shrink-0"
              >
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

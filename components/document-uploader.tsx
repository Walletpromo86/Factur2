"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, X, ImageIcon, FileIcon, CheckCircle, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"

interface DocumentUploaderProps {
  onUploadComplete: (files: UploadedFile[]) => void
  maxFiles?: number
  maxSize?: number // em bytes
  allowedTypes?: string[]
  entityType: "supplier" | "transporter"
  category: string
}

export interface UploadedFile {
  name: string
  size: number
  type: string
  url: string
  entityType: "supplier" | "transporter"
  category: string
}

export function DocumentUploader({
  onUploadComplete,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB por padrão
  allowedTypes = ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx"],
  entityType,
  category,
}: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>({})
  const [uploadSuccess, setUploadSuccess] = useState<{ [key: string]: boolean }>({})
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Verificar limite de arquivos
      if (files.length + acceptedFiles.length > maxFiles) {
        alert(`Você pode enviar no máximo ${maxFiles} arquivos.`)
        return
      }

      // Verificar tamanho dos arquivos
      const oversizedFiles = acceptedFiles.filter((file) => file.size > maxSize)
      if (oversizedFiles.length > 0) {
        alert(`Alguns arquivos excedem o tamanho máximo de ${formatFileSize(maxSize)}.`)
        return
      }

      setFiles((prev) => [...prev, ...acceptedFiles])
    },
    [files, maxFiles, maxSize],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce(
      (acc, type) => {
        if (type.startsWith("image/")) acc["image/*"] = []
        else if (type === "application/pdf") acc["application/pdf"] = []
        else if ([".doc", ".docx"].includes(type)) acc[".doc,.docx"] = []
        else if ([".xls", ".xlsx"].includes(type)) acc[".xls,.xlsx"] = []
        return acc
      },
      {} as { [key: string]: string[] },
    ),
    maxSize,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))

    // Limpar estados relacionados ao arquivo removido
    const fileId = files[index].name + files[index].size
    const newUploadProgress = { ...uploadProgress }
    const newUploadErrors = { ...uploadErrors }
    const newUploadSuccess = { ...uploadSuccess }

    delete newUploadProgress[fileId]
    delete newUploadErrors[fileId]
    delete newUploadSuccess[fileId]

    setUploadProgress(newUploadProgress)
    setUploadErrors(newUploadErrors)
    setUploadSuccess(newUploadSuccess)
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    const uploadedFiles: UploadedFile[] = []
    const newUploadProgress = { ...uploadProgress }
    const newUploadErrors = { ...uploadErrors }
    const newUploadSuccess = { ...uploadSuccess }

    for (const file of files) {
      const fileId = file.name + file.size
      newUploadProgress[fileId] = 0
      setUploadProgress({ ...newUploadProgress })

      try {
        // Criar um FormData para o upload
        const filename = `${entityType}/${category}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

        // Simular progresso de upload
        const simulateProgress = () => {
          let progress = 0
          const interval = setInterval(() => {
            progress += Math.random() * 10
            if (progress > 95) {
              clearInterval(interval)
              progress = 95
            }
            newUploadProgress[fileId] = Math.min(95, progress)
            setUploadProgress({ ...newUploadProgress })
          }, 200)
          return interval
        }

        const progressInterval = simulateProgress()

        // Fazer o upload para o Vercel Blob
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
          method: "POST",
          body: file,
        })

        clearInterval(progressInterval)

        if (!response.ok) {
          throw new Error(`Erro ao fazer upload: ${response.statusText}`)
        }

        const data = await response.json()

        // Upload completo
        newUploadProgress[fileId] = 100
        newUploadSuccess[fileId] = true
        setUploadProgress({ ...newUploadProgress })
        setUploadSuccess({ ...newUploadSuccess })

        // Adicionar à lista de arquivos enviados
        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: data.url,
          entityType,
          category,
        })
      } catch (error) {
        console.error("Erro ao fazer upload:", error)
        newUploadErrors[fileId] = "Falha no upload"
        newUploadSuccess[fileId] = false
        setUploadErrors({ ...newUploadErrors })
        setUploadSuccess({ ...newUploadSuccess })
      }
    }

    // Notificar o componente pai sobre os arquivos enviados com sucesso
    if (uploadedFiles.length > 0) {
      onUploadComplete(uploadedFiles)
    }

    // Manter apenas os arquivos com erro para tentar novamente
    setFiles(
      files.filter((file) => {
        const fileId = file.name + file.size
        return !newUploadSuccess[fileId]
      }),
    )

    setUploading(false)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-neon-cyan" />
    } else if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-neon-pink" />
    } else if (file.type.includes("word")) {
      return <FileIcon className="h-5 w-5 text-neon-blue" />
    } else if (file.type.includes("excel") || file.type.includes("sheet")) {
      return <FileIcon className="h-5 w-5 text-neon-green" />
    } else {
      return <FileIcon className="h-5 w-5 text-muted-foreground" />
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const isImage = (file: File) => file.type.startsWith("image/")

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive || dragActive
            ? "border-neon-purple bg-neon-purple/5"
            : "border-muted-foreground/25 hover:border-neon-purple/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrag}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className={`h-8 w-8 ${isDragActive ? "text-neon-purple" : "text-muted-foreground"}`} />
          <p className="font-medium">
            {isDragActive ? "Solte os ficheiros aqui..." : "Arraste e solte ficheiros aqui, ou clique para selecionar"}
          </p>
          <p className="text-sm text-muted-foreground">
            Suporta imagens, PDFs e documentos Office (máx. {formatFileSize(maxSize)})
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neon-blue">
              {files.length} ficheiro{files.length > 1 ? "s" : ""} selecionado{files.length > 1 ? "s" : ""}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={uploadFiles}
              disabled={uploading}
              className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
            >
              {uploading ? "Enviando..." : "Enviar Arquivos"}
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => {
              const fileId = file.name + file.size
              const progress = uploadProgress[fileId] || 0
              const error = uploadErrors[fileId]
              const success = uploadSuccess[fileId]

              return (
                <Card key={index} className="flex items-center p-3 futuristic-card">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {isImage(file) && progress === 100 && success ? (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                        <Image
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={file.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0">{getFileIcon(file)}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate max-w-[200px]" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  {progress > 0 && progress < 100 && (
                    <div className="w-24 mx-2">
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {success && <CheckCircle className="h-5 w-5 text-neon-green mr-2" />}
                  {error && <AlertCircle className="h-5 w-5 text-neon-pink mr-2" title={error} />}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="hover:text-neon-pink flex-shrink-0"
                    disabled={uploading && progress > 0 && progress < 100}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remover ficheiro</span>
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " bytes"
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  else return (bytes / 1048576).toFixed(1) + " MB"
}

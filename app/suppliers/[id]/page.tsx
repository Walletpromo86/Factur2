"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNavigation } from "@/components/main-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2, FileText, Building, Phone, CreditCard } from "lucide-react"
import Link from "next/link"
import { useData } from "@/contexts/data-context"

export default function SupplierDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getSupplier, deleteSupplier } = useData()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const supplier = getSupplier(params.id)

  if (!supplier) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <MainNavigation />
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <Link href="/suppliers">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Fornecedor não encontrado</h1>
          </div>
        </div>
      </div>
    )
  }

  // Função para apagar fornecedor
  const handleDelete = () => {
    setIsDeleting(true)

    // Simulação de uma operação de exclusão
    setTimeout(() => {
      deleteSupplier(params.id)
      setIsDeleting(false)
      setShowDeleteConfirm(false)

      // Mostrar notificação de sucesso
      showNotification("✅ Fornecedor apagado com sucesso!")

      // Redirecionar para a lista de fornecedores
      router.push("/suppliers")
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

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavigation />
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/suppliers">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Detalhes do Fornecedor
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="futuristic-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Informações Gerais</CardTitle>
              <Building className="h-5 w-5 text-neon-purple" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Nome</span>
                  <span className="font-medium">{supplier.name}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Contacto</span>
                  <span className="font-medium">{supplier.contact}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Morada</span>
                  <span className="font-medium">{supplier.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Contactos</CardTitle>
              <Phone className="h-5 w-5 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="font-medium">{supplier.email}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Telefone</span>
                  <span className="font-medium">{supplier.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Informações Fiscais</CardTitle>
              <CreditCard className="h-5 w-5 text-neon-green" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">NIF</span>
                  <span className="font-medium">{supplier.vat}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="futuristic-card md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">Documentos Recentes</CardTitle>
              <FileText className="h-5 w-5 text-neon-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground">Nenhum documento associado a este fornecedor.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Link href={`/suppliers/${params.id}/edit`}>
            <Button className="bg-neon-blue hover:bg-neon-blue/80">
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Apagar
          </Button>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-6">
              Tem certeza que deseja apagar o fornecedor <span className="font-bold">{supplier.name}</span>? Esta ação
              não pode ser desfeita.
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

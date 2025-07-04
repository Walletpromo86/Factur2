"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useData } from "@/contexts/data-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Truck, Plus, Search, Edit, Trash2, Eye, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function TransportersPage() {
  const { transporters, deleteTransporter, loading } = useData()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransporters = transporters.filter(
    (transporter) =>
      transporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transporter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transporter.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteTransporter = async (id: string, name: string) => {
    try {
      await deleteTransporter(id)
      toast({
        title: "Transportadora eliminada",
        description: `A transportadora ${name} foi eliminada com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao eliminar a transportadora. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Transportadoras</h1>
                  <p className="text-gray-600">Gerir todas as transportadoras do sistema</p>
                </div>
                <Button asChild>
                  <Link href="/transporters/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Transportadora
                  </Link>
                </Button>
              </div>

              {/* Search */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Pesquisar Transportadoras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Pesquisar por nome, email ou licença..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Transporters List */}
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Transportadoras ({filteredTransporters.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredTransporters.length === 0 ? (
                    <div className="text-center py-12">
                      <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchTerm ? "Nenhuma transportadora encontrada" : "Nenhuma transportadora cadastrada"}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm
                          ? "Tente ajustar os termos de pesquisa."
                          : "Comece por adicionar a sua primeira transportadora."}
                      </p>
                      {!searchTerm && (
                        <Button asChild>
                          <Link href="/transporters/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Primeira Transportadora
                          </Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredTransporters.map((transporter) => (
                        <div
                          key={transporter.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <Truck className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{transporter.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {transporter.email}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {transporter.phone}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">Licença: {transporter.licenseNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/transporters/${transporter.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/transporters/${transporter.id}/edit`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 bg-transparent"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Eliminar Transportadora</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem a certeza que deseja eliminar a transportadora {transporter.name}? Esta ação não
                                    pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteTransporter(transporter.id, transporter.name)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

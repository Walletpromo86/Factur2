"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useData } from "@/contexts/data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Truck, Euro, TrendingUp, Clock, CheckCircle, Plus } from "lucide-react"
import Link from "next/link"
import { formatCurrency, safeNumber } from "@/lib/utils"

export default function DashboardPage() {
  const { invoices, suppliers, transporters, loading } = useData()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const totalInvoices = invoices?.length || 0
  const paidInvoices = invoices?.filter((inv) => inv.status === "paid")?.length || 0
  const pendingInvoices = invoices?.filter((inv) => inv.status === "pending")?.length || 0
  const overdueInvoices = invoices?.filter((inv) => inv.status === "overdue")?.length || 0

  const totalAmount = invoices?.reduce((sum, inv) => sum + safeNumber(inv.amount), 0) || 0
  const paidAmount =
    invoices?.filter((inv) => inv.status === "paid")?.reduce((sum, inv) => sum + safeNumber(inv.amount), 0) || 0

  const recentInvoices =
    invoices?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.slice(0, 5) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paga</Badge>
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>
      case "overdue":
        return <Badge variant="destructive">Atrasada</Badge>
      case "cancelled":
        return <Badge variant="outline">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Visão geral do seu sistema de gestão de faturas</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Faturas</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalInvoices}</div>
                    <p className="text-xs text-muted-foreground">
                      {paidInvoices} pagas, {pendingInvoices} pendentes
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(paidAmount)} recebidos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{suppliers?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Fornecedores ativos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transportadoras</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{transporters?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Transportadoras ativas</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Invoices */}
                <Card>
                  <CardHeader>
                    <CardTitle>Faturas Recentes</CardTitle>
                    <CardDescription>As últimas 5 faturas criadas no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentInvoices.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Nenhuma fatura encontrada</p>
                        <Button asChild>
                          <Link href="/faturas/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Criar Primeira Fatura
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentInvoices.map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{invoice.number}</p>
                              <p className="text-sm text-gray-600">{invoice.supplier}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                              {getStatusBadge(invoice.status)}
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full bg-transparent" asChild>
                          <Link href="/faturas">Ver Todas as Faturas</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" asChild>
                      <Link href="/faturas/new">
                        <FileText className="mr-2 h-4 w-4" />
                        Nova Fatura
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/suppliers/new">
                        <Users className="mr-2 h-4 w-4" />
                        Novo Fornecedor
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/transporters/new">
                        <Truck className="mr-2 h-4 w-4" />
                        Nova Transportadora
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/faturas">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Ver Relatórios
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Status Overview */}
              {totalInvoices > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Estado das Faturas</CardTitle>
                    <CardDescription>Distribuição das faturas por estado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Pagas</p>
                          <p className="text-sm text-gray-600">{paidInvoices} faturas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">Pendentes</p>
                          <p className="text-sm text-gray-600">{pendingInvoices} faturas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium">Atrasadas</p>
                          <p className="text-sm text-gray-600">{overdueInvoices} faturas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}

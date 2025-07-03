"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNavigation } from "@/components/main-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Building } from "lucide-react"
import Link from "next/link"

export default function EditSupplierPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dados simulados do fornecedor baseados no ID
  const [formData, setFormData] = useState({
    name: params.id === "1" ? "Materiais ABC" : params.id === "2" ? "Fornecedor XYZ" : "Materiais Premium",
    contact: params.id === "1" ? "João Silva" : params.id === "2" ? "Ana Costa" : "Carlos Oliveira",
    email: params.id === "1" ? "joao@materiaisabc.pt" : params.id === "2" ? "ana@xyz.pt" : "carlos@premium.pt",
    phone: params.id === "1" ? "912345678" : params.id === "2" ? "923456789" : "934567890",
    address:
      params.id === "1"
        ? "Rua Industrial, 123, 1000-001 Lisboa"
        : params.id === "2"
          ? "Avenida Comercial, 45, 4000-123 Porto"
          : "Rua dos Materiais, 78, 3000-456 Coimbra",
    vat: params.id === "1" ? "PT123456789" : params.id === "2" ? "PT234567890" : "PT345678901",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.vat) {
      alert("❌ Por favor, preencha os campos obrigatórios!")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de atualização
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mostrar notificação de sucesso
      showNotification("✅ Fornecedor atualizado com sucesso!")

      // Redirecionar para os detalhes
      router.push(`/suppliers/${params.id}`)
    } catch (error) {
      console.error("❌ Erro ao atualizar fornecedor:", error)
      alert("❌ Erro ao atualizar fornecedor. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <Link href={`/suppliers/${params.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Editar Fornecedor
          </h1>
        </div>

        <Card className="futuristic-card max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Informações do Fornecedor</CardTitle>
            <Building className="h-5 w-5 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do fornecedor"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contacto</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Nome do contacto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@exemplo.pt"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="912345678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat">NIF *</Label>
                  <Input
                    id="vat"
                    name="vat"
                    value={formData.vat}
                    onChange={handleInputChange}
                    placeholder="PT123456789"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Morada</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rua, número, código postal, cidade"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Link href={`/suppliers/${params.id}`}>
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting} className="bg-neon-purple hover:bg-neon-purple/80">
                  {isSubmitting ? "A atualizar..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .fade-out {
          opacity: 0;
          transition: opacity 0.5s;
        }
      `}</style>
    </div>
  )
}

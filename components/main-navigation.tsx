"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Home, FileText, Users, Truck, Settings } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Faturas", href: "/faturas", icon: FileText },
  { name: "Fornecedores", href: "/suppliers", icon: Users },
  { name: "Transportadoras", href: "/transporters", icon: Truck },
  { name: "Configurações", href: "/settings", icon: Settings },
]

interface MainNavigationProps {
  children?: React.ReactNode
}

export function MainNavigation({ children }: MainNavigationProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!user) return null

  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

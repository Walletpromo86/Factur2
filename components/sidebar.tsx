"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { FileText, Users, Truck, BarChart3, Settings, Home, Building2 } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Faturas", href: "/faturas", icon: FileText },
  { name: "Fornecedores", href: "/suppliers", icon: Users },
  { name: "Transportadoras", href: "/transporters", icon: Truck },
  { name: "Relatórios", href: "/reports", icon: BarChart3 },
  { name: "Configurações", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center bg-gray-800">
        <Building2 className="h-8 w-8 text-white" />
        <span className="ml-2 text-lg font-semibold text-white">InvoiceApp</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
              )}
            >
              <item.icon
                className={cn(
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                  "mr-3 h-5 w-5 flex-shrink-0",
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="flex-shrink-0 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

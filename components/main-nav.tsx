"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Faturas", href: "/faturas" },
  { name: "Fornecedores", href: "/suppliers" },
  { name: "Transportadoras", href: "/transporters" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

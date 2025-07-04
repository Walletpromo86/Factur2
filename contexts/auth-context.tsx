"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AuthContextType, User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Credenciais de teste
    const credentials = {
      "admin@empresa.pt": "Admin@2024!",
      "financeiro@empresa.pt": "Finance@2024!",
      "user@empresa.pt": "User@2024!",
      "consultor@empresa.pt": "View@2024!",
    }

    if (credentials[email as keyof typeof credentials] === password) {
      const foundUser = mockUsers.find((u) => u.email === email)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("currentUser", JSON.stringify(foundUser))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

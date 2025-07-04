import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side singleton
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Database types
export interface Database {
  public: {
    Tables: {
      invoices: {
        Row: {
          id: string
          number: string
          supplier: string
          amount: number
          tax: number
          total: number
          due_date: string
          status: "paid" | "pending" | "overdue"
          description: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          number: string
          supplier: string
          amount: number
          tax: number
          total: number
          due_date: string
          status: "paid" | "pending" | "overdue"
          description: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          number?: string
          supplier?: string
          amount?: number
          tax?: number
          total?: number
          due_date?: string
          status?: "paid" | "pending" | "overdue"
          description?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          address: string
          tax_id: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          address: string
          tax_id: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          tax_id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      transporters: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          address: string
          license_number: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          address: string
          license_number: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          license_number?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
  }
}

// Types for our database
export interface Invoice {
  id: string
  numero: string
  fornecedor: string
  quantidade: number
  imposto: number
  total: number
  due_date: string
  status: "pago" | "pendente" | "atrasado"
  descricao: string
  created_at?: string
  updated_at?: string
}

export interface Supplier {
  id: string
  nome: string
  email: string
  telefone: string
  endereco: string
  nif: string
  created_at?: string
  updated_at?: string
}

export interface Transporter {
  id: string
  nome: string
  email: string
  telefone: string
  endereco: string
  nif: string
  created_at?: string
  updated_at?: string
}

// Helper function to get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// Helper function for authenticated requests
export const getAuthenticatedSupabase = async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }
  return { supabase, user }
}

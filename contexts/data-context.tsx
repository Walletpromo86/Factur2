"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { DataContextType, Invoice, Supplier, Transporter } from "@/lib/types"
import { mockInvoices, mockSuppliers, mockTransporters } from "@/lib/mock-data"
import { generateId } from "@/lib/utils"

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

interface DataProviderProps {
  children: ReactNode
}

export function DataProvider({ children }: DataProviderProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [transporters, setTransporters] = useState<Transporter[]>([])
  const [loading, setLoading] = useState(true)

  // Carregar dados do localStorage ou usar dados mock
  useEffect(() => {
    try {
      const savedInvoices = localStorage.getItem("invoices")
      const savedSuppliers = localStorage.getItem("suppliers")
      const savedTransporters = localStorage.getItem("transporters")

      setInvoices(savedInvoices ? JSON.parse(savedInvoices) : mockInvoices)
      setSuppliers(savedSuppliers ? JSON.parse(savedSuppliers) : mockSuppliers)
      setTransporters(savedTransporters ? JSON.parse(savedTransporters) : mockTransporters)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      setInvoices(mockInvoices)
      setSuppliers(mockSuppliers)
      setTransporters(mockTransporters)
    } finally {
      setLoading(false)
    }
  }, [])

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("invoices", JSON.stringify(invoices))
    }
  }, [invoices, loading])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("suppliers", JSON.stringify(suppliers))
    }
  }, [suppliers, loading])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("transporters", JSON.stringify(transporters))
    }
  }, [transporters, loading])

  // Funções para gerenciar faturas
  const addInvoice = async (invoiceData: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setInvoices((prev) => [...prev, newInvoice])
  }

  const updateInvoice = async (id: string, invoiceData: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, ...invoiceData, updatedAt: new Date().toISOString() } : invoice,
      ),
    )
  }

  const deleteInvoice = async (id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
  }

  // Funções para gerenciar fornecedores
  const addSupplier = async (supplierData: Omit<Supplier, "id" | "createdAt" | "updatedAt">) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setSuppliers((prev) => [...prev, newSupplier])
  }

  const updateSupplier = async (id: string, supplierData: Partial<Supplier>) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === id ? { ...supplier, ...supplierData, updatedAt: new Date().toISOString() } : supplier,
      ),
    )
  }

  const deleteSupplier = async (id: string) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id))
  }

  // Funções para gerenciar transportadoras
  const addTransporter = async (transporterData: Omit<Transporter, "id" | "createdAt" | "updatedAt">) => {
    const newTransporter: Transporter = {
      ...transporterData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTransporters((prev) => [...prev, newTransporter])
  }

  const updateTransporter = async (id: string, transporterData: Partial<Transporter>) => {
    setTransporters((prev) =>
      prev.map((transporter) =>
        transporter.id === id
          ? { ...transporter, ...transporterData, updatedAt: new Date().toISOString() }
          : transporter,
      ),
    )
  }

  const deleteTransporter = async (id: string) => {
    setTransporters((prev) => prev.filter((transporter) => transporter.id !== id))
  }

  const value: DataContextType = {
    invoices,
    suppliers,
    transporters,
    loading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addTransporter,
    updateTransporter,
    deleteTransporter,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

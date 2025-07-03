export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "financeiro" | "user" | "consultor"
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  number: string
  supplier: string
  transporter: string
  description: string
  amount: number
  total: number
  date: string
  dueDate: string
  status: "pending" | "paid" | "overdue" | "cancelled"
  createdAt: string
  updatedAt: string
  items: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  address: string
  taxId: string
  createdAt: string
  updatedAt: string
}

export interface Transporter {
  id: string
  name: string
  email: string
  phone: string
  address: string
  taxId: string
  createdAt: string
  updatedAt: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export interface DataContextType {
  invoices: Invoice[]
  suppliers: Supplier[]
  transporters: Transporter[]
  loading: boolean
  addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<void>
  deleteInvoice: (id: string) => Promise<void>
  addSupplier: (supplier: Omit<Supplier, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<void>
  deleteSupplier: (id: string) => Promise<void>
  addTransporter: (transporter: Omit<Transporter, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateTransporter: (id: string, transporter: Partial<Transporter>) => Promise<void>
  deleteTransporter: (id: string) => Promise<void>
}

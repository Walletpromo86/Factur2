"use client"

import React from "react"

import { useState } from "react"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  // Função para renderizar a página atual
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard setCurrentPage={setCurrentPage} />
      case "invoices":
        return <Invoices />
      case "suppliers":
        return <Suppliers />
      case "transporters":
        return <Transporters />
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="app">
      {/* Menu Superior */}
      <header className="top-menu">
        <h1 className="title">🎯 Sistema de Faturação</h1>
        <nav className="nav-menu">
          <button
            className={`nav-btn ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentPage("dashboard")}
          >
            📊 Painel
          </button>
          <button
            className={`nav-btn ${currentPage === "invoices" ? "active" : ""}`}
            onClick={() => setCurrentPage("invoices")}
          >
            📄 Faturas
          </button>
          <button
            className={`nav-btn ${currentPage === "suppliers" ? "active" : ""}`}
            onClick={() => setCurrentPage("suppliers")}
          >
            🏢 Fornecedores
          </button>
          <button
            className={`nav-btn ${currentPage === "transporters" ? "active" : ""}`}
            onClick={() => setCurrentPage("transporters")}
          >
            🚛 Transportadoras
          </button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}

// Componente Dashboard
function Dashboard({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="gradient-text">Dashboard</h1>
        <p className="subtitle">Gestão de Fornecedores e Transportadoras</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <h3>Total de Faturas</h3>
          <p className="number">127</p>
          <span className="change">+5 no último mês</span>
        </div>

        <div className="stat-card blue">
          <h3>Pagamentos Pendentes</h3>
          <p className="number">€12,450</p>
          <span className="change">8 faturas por pagar</span>
        </div>

        <div className="stat-card cyan">
          <h3>Fornecedores</h3>
          <p className="number">24</p>
          <span className="change">+2 no último mês</span>
        </div>

        <div className="stat-card green">
          <h3>Transportadoras</h3>
          <p className="number">7</p>
          <span className="change">Sem alterações</span>
        </div>
      </div>

      <div className="content-card">
        <h2>✅ SISTEMA FUNCIONANDO!</h2>
        <p>Vite + React + TypeScript funcionando perfeitamente!</p>
        <p>Use o menu superior para navegar entre as páginas.</p>
        <div style={{ marginTop: "1.5rem" }}>
          <button className="primary-button" onClick={() => setCurrentPage("invoices")}>
            📄 Ir para Faturas
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente Faturas
function Invoices() {
  const [showForm, setShowForm] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<any>(null)
  const [viewingInvoice, setViewingInvoice] = useState<any>(null)
  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      supplier: "Materiais ABC",
      date: "15/05/2023",
      dueDate: "15/06/2023",
      amount: 1250.75,
      status: "paid",
      entityType: "supplier",
      description: "Materiais de construção",
      paymentMethod: "bank-transfer",
      createdAt: "2023-05-15T10:00:00Z",
      files: {
        supplier: [
          { name: "fatura-fornecedor-001.pdf", size: 1240000, type: "application/pdf" },
          { name: "comprovativo-banco.pdf", size: 890000, type: "application/pdf" },
        ],
        transporter: [],
      },
      currency: "EUR",
      convertedAmount: 1375.83,
      exchangeRate: 1.1,
    },
    {
      id: "INV-002",
      supplier: "Transportes Rápidos",
      date: "20/05/2023",
      dueDate: "05/06/2023",
      amount: 450.0,
      status: "pending",
      entityType: "transporter",
      description: "Serviços de transporte",
      paymentMethod: "paypal",
      createdAt: "2023-05-20T14:30:00Z",
      files: {
        supplier: [],
        transporter: [
          { name: "fatura-transportadora.pdf", size: 750000, type: "application/pdf" },
          { name: "comprovativo-pagamento.jpg", size: 2500000, type: "image/jpeg" },
        ],
      },
      currency: "EUR",
      convertedAmount: 495.0,
      exchangeRate: 1.1,
    },
    {
      id: "INV-003",
      supplier: "Fornecedor XYZ",
      date: "22/05/2023",
      dueDate: "22/06/2023",
      amount: 2780.5,
      status: "paid",
      entityType: "supplier",
      description: "Equipamentos industriais",
      paymentMethod: "bank-transfer",
      createdAt: "2023-05-22T09:15:00Z",
      files: {
        supplier: [
          { name: "fatura-equipamentos.pdf", size: 1500000, type: "application/pdf" },
          {
            name: "especificacoes-tecnicas.docx",
            size: 450000,
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        ],
        transporter: [{ name: "guia-transporte.pdf", size: 320000, type: "application/pdf" }],
      },
      currency: "EUR",
      convertedAmount: 3058.55,
      exchangeRate: 1.1,
    },
  ])

  const handleSaveInvoice = (newInvoice: any) => {
    console.log("💾 Salvando nova fatura:", newInvoice)
    setInvoices((prev) => [newInvoice, ...prev])
    setShowForm(false)
    showNotification(`✅ Fatura ${newInvoice.id} criada com sucesso!`, "success")
  }

  const handleEditInvoice = (updatedInvoice: any) => {
    console.log("✏️ Editando fatura:", updatedInvoice)
    setInvoices((prev) => prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)))
    setEditingInvoice(null)
    showNotification(`✅ Fatura ${updatedInvoice.id} atualizada com sucesso!`, "success")
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    if (window.confirm("❓ Tem certeza que deseja apagar esta fatura?")) {
      console.log("🗑️ Apagando fatura:", invoiceId)
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId))
      showNotification(`🗑️ Fatura ${invoiceId} apagada com sucesso!`, "success")
    }
  }

  const handleViewInvoice = (invoice: any) => {
    console.log("👁️ Visualizando fatura:", invoice)
    setViewingInvoice(invoice)
  }

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    const notification = document.createElement("div")
    notification.className = "success-notification"
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, ${type === "success" ? "#10b981, #06b6d4" : "#ef4444, #f97316"});
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(${type === "success" ? "16, 185, 129" : "239, 68, 68"}, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
      ">
        ${message}
      </div>
    `
    document.body.appendChild(notification)

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 3000)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">📄 Faturas</h1>
          <p className="subtitle">Gestão de faturas de fornecedores e transportadoras</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Nova Fatura
        </button>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>Lista de Faturas ({invoices.length})</h3>
          <div className="filters">
            <input type="text" placeholder="🔍 Pesquisar faturas..." className="search-input" />
            <select className="filter-select">
              <option value="">Todos os estados</option>
              <option value="paid">Pagas</option>
              <option value="pending">Pendentes</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <span>Referência</span>
            <span>Entidade</span>
            <span>Tipo</span>
            <span>Data</span>
            <span>Vencimento</span>
            <span>Valor</span>
            <span>Estado</span>
            <span>Ações</span>
          </div>

          {invoices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>Nenhuma fatura encontrada</h3>
              <p>Clique em "Nova Fatura" para criar a primeira fatura.</p>
            </div>
          ) : (
            invoices.map((invoice) => (
              <div key={invoice.id} className="table-row">
                <span className="invoice-id">{invoice.id}</span>
                <span className="supplier-name">{invoice.supplier}</span>
                <span className={`entity-type ${invoice.entityType}`}>
                  {invoice.entityType === "supplier" ? "🏢 Fornecedor" : "🚛 Transportadora"}
                </span>
                <span>{invoice.date}</span>
                <span>{invoice.dueDate}</span>
                <span className="amount">
                  {invoice.currency === "EUR" ? "€" : "$"}
                  {invoice.amount.toFixed(2)}
                  {invoice.convertedAmount && (
                    <div className="converted-amount-small">
                      ≈ {invoice.currency === "EUR" ? "$" : "€"}
                      {invoice.convertedAmount.toFixed(2)}
                    </div>
                  )}
                </span>
                <span className={`badge ${invoice.status === "paid" ? "green" : "purple"}`}>
                  {invoice.status === "paid" ? "✅ Pago" : "⏳ Pendente"}
                </span>
                <span className="actions">
                  <button className="action-btn view" onClick={() => handleViewInvoice(invoice)} title="Ver detalhes">
                    👁️
                  </button>
                  <button className="action-btn edit" onClick={() => setEditingInvoice(invoice)} title="Editar fatura">
                    ✏️
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteInvoice(invoice.id)}
                    title="Apagar fatura"
                  >
                    🗑️
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Nova Fatura */}
      {showForm && <NewInvoiceForm onClose={() => setShowForm(false)} onSave={handleSaveInvoice} />}

      {/* Modal Editar Fatura */}
      {editingInvoice && (
        <EditInvoiceForm invoice={editingInvoice} onClose={() => setEditingInvoice(null)} onSave={handleEditInvoice} />
      )}

      {/* Modal Ver Fatura */}
      {viewingInvoice && <ViewInvoiceModal invoice={viewingInvoice} onClose={() => setViewingInvoice(null)} />}
    </div>
  )
}

// Componente para Visualizar Fatura ATUALIZADO
function ViewInvoiceModal({ invoice, onClose }: { invoice: any; onClose: () => void }) {
  const getPaymentMethodLabel = (method: string) => {
    const methods: { [key: string]: string } = {
      "bank-transfer": "💳 Transferência Bancária",
      paypal: "💰 PayPal",
      cash: "💵 Dinheiro",
      check: "📝 Cheque",
    }
    return methods[method] || method
  }

  // Função para contar total de arquivos
  const getTotalFiles = () => {
    const supplierFiles = invoice.files?.supplier || []
    const transporterFiles = invoice.files?.transporter || []
    return supplierFiles.length + transporterFiles.length
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="gradient-text">👁️ Detalhes da Fatura</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="view-content">
          <div className="view-grid">
            <div className="view-section">
              <h3>📄 Informações Básicas</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Referência:</label>
                  <span className="invoice-id">{invoice.id}</span>
                </div>
                <div className="info-item">
                  <label>Entidade:</label>
                  <span>{invoice.supplier}</span>
                </div>
                <div className="info-item">
                  <label>Tipo:</label>
                  <span className={`entity-type ${invoice.entityType}`}>
                    {invoice.entityType === "supplier" ? "🏢 Fornecedor" : "🚛 Transportadora"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Estado:</label>
                  <span className={`badge ${invoice.status === "paid" ? "green" : "purple"}`}>
                    {invoice.status === "paid" ? "✅ Pago" : "⏳ Pendente"}
                  </span>
                </div>
              </div>
            </div>

            <div className="view-section">
              <h3>📅 Datas e Valores</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Data da Fatura:</label>
                  <span>{invoice.date}</span>
                </div>
                <div className="info-item">
                  <label>Data de Vencimento:</label>
                  <span>{invoice.dueDate}</span>
                </div>
                <div className="info-item">
                  <label>Valor:</label>
                  <span className="amount">
                    {invoice.currency === "EUR" ? "€" : "$"}
                    {invoice.amount.toFixed(2)}
                    {invoice.convertedAmount && (
                      <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontStyle: "italic" }}>
                        ≈ {invoice.currency === "EUR" ? "$" : "€"}
                        {invoice.convertedAmount.toFixed(2)}
                        {invoice.exchangeRate && <span> (Taxa: {invoice.exchangeRate})</span>}
                      </div>
                    )}
                  </span>
                </div>
                <div className="info-item">
                  <label>Método de Pagamento:</label>
                  <span>{getPaymentMethodLabel(invoice.paymentMethod)}</span>
                </div>
              </div>
            </div>

            <div className="view-section full-width">
              <h3>📝 Descrição</h3>
              <div className="description-box">
                <p>{invoice.description || "Sem descrição"}</p>
              </div>
            </div>

            {/* SEÇÃO DE FORNECEDOR */}
            <div className="view-section full-width entity-section supplier-section">
              <h3>🏢 Fatura do Fornecedor</h3>

              {invoice.files?.supplier && invoice.files.supplier.length > 0 ? (
                <div>
                  <h4 className="subsection-title">📎 Documentos do Fornecedor ({invoice.files.supplier.length})</h4>
                  <div className="files-grid">
                    {invoice.files.supplier.map((file: any, index: number) => (
                      <div key={index} className="file-card supplier-file">
                        <div className="file-icon">
                          {file.type?.includes("pdf")
                            ? "📄"
                            : file.type?.includes("image")
                              ? "🖼️"
                              : file.type?.includes("word")
                                ? "📝"
                                : file.type?.includes("excel")
                                  ? "📊"
                                  : "📎"}
                        </div>
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{formatFileSize(file.size)}</p>
                          <p className="file-category">Fornecedor</p>
                        </div>
                        <button className="download-btn" title="Descarregar">
                          📥
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-files">
                  <div className="empty-icon">📄</div>
                  <p>Nenhum documento de fornecedor anexado</p>
                </div>
              )}
            </div>

            {/* SEÇÃO DE TRANSPORTADORA */}
            <div className="view-section full-width entity-section transporter-section">
              <h3>🚛 Fatura da Transportadora</h3>

              {invoice.files?.transporter && invoice.files.transporter.length > 0 ? (
                <div>
                  <h4 className="subsection-title">
                    📎 Documentos da Transportadora ({invoice.files.transporter.length})
                  </h4>
                  <div className="files-grid">
                    {invoice.files.transporter.map((file: any, index: number) => (
                      <div key={index} className="file-card transporter-file">
                        <div className="file-icon">
                          {file.type?.includes("pdf")
                            ? "📄"
                            : file.type?.includes("image")
                              ? "🖼️"
                              : file.type?.includes("word")
                                ? "📝"
                                : file.type?.includes("excel")
                                  ? "📊"
                                  : "📎"}
                        </div>
                        <div className="file-details">
                          <p className="file-name">{file.name}</p>
                          <p className="file-size">{formatFileSize(file.size)}</p>
                          <p className="file-category">Transportadora</p>
                        </div>
                        <button className="download-btn" title="Descarregar">
                          📥
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-files">
                  <div className="empty-icon">🚛</div>
                  <p>Nenhum documento de transportadora anexado</p>
                </div>
              )}
            </div>

            {/* RESUMO DE DOCUMENTOS */}
            <div className="view-section full-width">
              <h3>📊 Resumo de Documentos</h3>
              <div className="documents-summary">
                <div className="summary-item">
                  <span className="summary-label">📄 Total de Documentos:</span>
                  <span className="summary-value">{getTotalFiles()}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">🏢 Documentos Fornecedor:</span>
                  <span className="summary-value">{invoice.files?.supplier?.length || 0}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">🚛 Documentos Transportadora:</span>
                  <span className="summary-value">{invoice.files?.transporter?.length || 0}</span>
                </div>
              </div>
            </div>

            <div className="view-section full-width">
              <h3>ℹ️ Informações do Sistema</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Criada em:</label>
                  <span>{new Date(invoice.createdAt).toLocaleString("pt-PT")}</span>
                </div>
                <div className="info-item">
                  <label>ID do Sistema:</label>
                  <span className="system-id">{invoice.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="view-actions">
            <button className="primary-button" onClick={onClose}>
              ✅ Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para Editar Fatura COM SEPARADORES
function EditInvoiceForm({
  invoice,
  onClose,
  onSave,
}: { invoice: any; onClose: () => void; onSave: (data: any) => void }) {
  // Determinar tab inicial baseado no tipo da fatura
  const [activeTab, setActiveTab] = useState(invoice.entityType === "supplier" ? "supplier" : "transporter")

  // Estados para os dados (inicializar com dados da fatura)
  const [supplierData, setSupplierData] = useState({
    invoiceNumber: invoice.entityType === "supplier" ? invoice.id : "",
    date: invoice.entityType === "supplier" ? invoice.date.split("/").reverse().join("-") : "",
    dueDate: invoice.entityType === "supplier" ? invoice.dueDate.split("/").reverse().join("-") : "",
    amount: invoice.entityType === "supplier" ? invoice.amount.toString() : "",
    currency: invoice.entityType === "supplier" ? invoice.currency || "EUR" : "EUR",
    entity: invoice.entityType === "supplier" ? invoice.supplier : "",
    description: invoice.entityType === "supplier" ? invoice.description : "",
    paymentMethod: invoice.entityType === "supplier" ? invoice.paymentMethod : "",
    status: invoice.entityType === "supplier" ? invoice.status : "pending",
  })

  const [transporterData, setTransporterData] = useState({
    invoiceNumber: invoice.entityType === "transporter" ? invoice.id : "",
    date: invoice.entityType === "transporter" ? invoice.date.split("/").reverse().join("-") : "",
    dueDate: invoice.entityType === "transporter" ? invoice.dueDate.split("/").reverse().join("-") : "",
    amount: invoice.entityType === "transporter" ? invoice.amount.toString() : "",
    currency: invoice.entityType === "transporter" ? invoice.currency || "EUR" : "EUR",
    entity: invoice.entityType === "transporter" ? invoice.supplier : "",
    description: invoice.entityType === "transporter" ? invoice.description : "",
    paymentMethod: invoice.entityType === "transporter" ? invoice.paymentMethod : "",
    status: invoice.entityType === "transporter" ? invoice.status : "pending",
  })

  // Estados para conversão
  const [supplierExchangeRate, setSupplierExchangeRate] = useState(1.1)
  const [supplierConvertedAmount, setSupplierConvertedAmount] = useState("")
  const [transporterExchangeRate, setTransporterExchangeRate] = useState(1.1)
  const [transporterConvertedAmount, setTransporterConvertedAmount] = useState("")
  const [isLoadingRate, setIsLoadingRate] = useState(false)

  const [supplierFiles, setSupplierFiles] = useState<File[]>([])
  const [transporterFiles, setTransporterFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Função para buscar taxa de câmbio
  const fetchExchangeRate = async (currency: string, isSupplier: boolean) => {
    setIsLoadingRate(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const rate = currency === "EUR" ? 1.1 : 0.91
      if (isSupplier) {
        setSupplierExchangeRate(rate)
      } else {
        setTransporterExchangeRate(rate)
      }
    } catch (error) {
      console.error("Erro ao buscar taxa de câmbio:", error)
    } finally {
      setIsLoadingRate(false)
    }
  }

  // Função para calcular conversão
  const calculateConversion = (amount: string, exchangeRate: number, isSupplier: boolean) => {
    if (amount && exchangeRate) {
      const amountNum = Number.parseFloat(amount)
      const converted = (amountNum * exchangeRate).toFixed(2)
      if (isSupplier) {
        setSupplierConvertedAmount(converted)
      } else {
        setTransporterConvertedAmount(converted)
      }
    } else {
      if (isSupplier) {
        setSupplierConvertedAmount("")
      } else {
        setTransporterConvertedAmount("")
      }
    }
  }

  // Effects para recalcular conversões
  React.useEffect(() => {
    if (supplierData.currency) {
      fetchExchangeRate(supplierData.currency, true)
    }
  }, [supplierData.currency])

  React.useEffect(() => {
    if (transporterData.currency) {
      fetchExchangeRate(transporterData.currency, false)
    }
  }, [transporterData.currency])

  React.useEffect(() => {
    calculateConversion(supplierData.amount, supplierExchangeRate, true)
  }, [supplierData.amount, supplierExchangeRate])

  React.useEffect(() => {
    calculateConversion(transporterData.amount, transporterExchangeRate, false)
  }, [transporterData.amount, transporterExchangeRate])

  // Handlers para mudanças nos inputs
  const handleSupplierInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTransporterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setTransporterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handlers para drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      if (activeTab === "supplier") {
        setSupplierFiles((prev) => [...prev, ...newFiles])
      } else {
        setTransporterFiles((prev) => [...prev, ...newFiles])
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (activeTab === "supplier") {
        setSupplierFiles((prev) => [...prev, ...newFiles])
      } else {
        setTransporterFiles((prev) => [...prev, ...newFiles])
      }
    }
  }

  const removeFile = (index: number) => {
    if (activeTab === "supplier") {
      setSupplierFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setTransporterFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Determinar qual tab está sendo editado
    const currentData = activeTab === "supplier" ? supplierData : transporterData
    const currentConvertedAmount = activeTab === "supplier" ? supplierConvertedAmount : transporterConvertedAmount
    const currentExchangeRate = activeTab === "supplier" ? supplierExchangeRate : transporterExchangeRate
    const currentFiles = activeTab === "supplier" ? supplierFiles : transporterFiles

    if (!currentData.invoiceNumber || !currentData.amount) {
      alert("❌ Por favor, preencha número da fatura e valor!")
      return
    }

    if (Number.parseFloat(currentData.amount) <= 0) {
      alert("❌ O valor deve ser maior que zero!")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Atualizar estrutura de arquivos
      const updatedFiles = {
        supplier: [...(invoice.files?.supplier || [])],
        transporter: [...(invoice.files?.transporter || [])],
      }

      // Adicionar novos arquivos à categoria correta
      if (activeTab === "supplier") {
        updatedFiles.supplier.push(
          ...currentFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          })),
        )
      } else {
        updatedFiles.transporter.push(
          ...currentFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          })),
        )
      }

      const updatedInvoice = {
        ...invoice,
        id: currentData.invoiceNumber,
        supplier: currentData.entity || invoice.supplier,
        date: currentData.date ? new Date(currentData.date).toLocaleDateString("pt-PT") : invoice.date,
        dueDate: currentData.dueDate ? new Date(currentData.dueDate).toLocaleDateString("pt-PT") : invoice.dueDate,
        amount: Number.parseFloat(currentData.amount),
        currency: currentData.currency,
        convertedAmount: currentConvertedAmount ? Number.parseFloat(currentConvertedAmount) : null,
        exchangeRate: currentExchangeRate,
        status: currentData.status,
        entityType: activeTab,
        description: currentData.description || invoice.description,
        paymentMethod: currentData.paymentMethod || invoice.paymentMethod,
        files: updatedFiles,
        updatedAt: new Date().toISOString(),
      }

      onSave(updatedInvoice)
    } catch (error) {
      console.error("❌ Erro ao editar fatura:", error)
      alert("❌ Erro ao editar fatura. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para renderizar os campos do formulário
  const renderFormFields = (
    data: any,
    handleChange: any,
    exchangeRate: number,
    convertedAmount: string,
    isSupplier: boolean,
  ) => (
    <div className="form-grid">
      <div className="form-column">
        <div className="form-group">
          <label htmlFor={`invoiceNumber-${isSupplier ? "supplier" : "transporter"}`}>Número da Fatura *</label>
          <input
            type="text"
            id={`invoiceNumber-${isSupplier ? "supplier" : "transporter"}`}
            name="invoiceNumber"
            value={data.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor={`date-${isSupplier ? "supplier" : "transporter"}`}>Data da Fatura</label>
          <input
            type="date"
            id={`date-${isSupplier ? "supplier" : "transporter"}`}
            name="date"
            value={data.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`dueDate-${isSupplier ? "supplier" : "transporter"}`}>Data de Vencimento</label>
          <input
            type="date"
            id={`dueDate-${isSupplier ? "supplier" : "transporter"}`}
            name="dueDate"
            value={data.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`currency-${isSupplier ? "supplier" : "transporter"}`}>Moeda</label>
          <select
            id={`currency-${isSupplier ? "supplier" : "transporter"}`}
            name="currency"
            value={data.currency}
            onChange={handleChange}
          >
            <option value="EUR">💶 Euro (EUR)</option>
            <option value="USD">💵 Dólar (USD)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`amount-${isSupplier ? "supplier" : "transporter"}`}>
            Valor ({data.currency}) *{isLoadingRate && <span className="loading-indicator"> ⏳</span>}
          </label>
          <div className="currency-input-container">
            <input
              type="number"
              id={`amount-${isSupplier ? "supplier" : "transporter"}`}
              name="amount"
              value={data.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="currency-input"
            />
            <span className="currency-symbol">{data.currency === "EUR" ? "€" : "$"}</span>
          </div>

          {/* Conversor de Moeda */}
          {data.amount && convertedAmount && (
            <div className="currency-converter">
              <div className="conversion-display">
                <span className="original-amount">
                  {data.currency === "EUR" ? "€" : "$"}
                  {data.amount}
                </span>
                <span className="conversion-arrow">⇄</span>
                <span className="converted-amount">
                  {data.currency === "EUR" ? "$" : "€"}
                  {convertedAmount}
                </span>
              </div>
              <div className="exchange-rate">
                Taxa: 1 {data.currency} = {exchangeRate} {data.currency === "EUR" ? "USD" : "EUR"}
                <button
                  type="button"
                  className="refresh-rate-btn"
                  onClick={() => fetchExchangeRate(data.currency, isSupplier)}
                  disabled={isLoadingRate}
                >
                  🔄
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-column">
        <div className="form-group">
          <label htmlFor={`entity-${isSupplier ? "supplier" : "transporter"}`}>
            {isSupplier ? "Fornecedor" : "Transportadora"}
          </label>
          <input
            type="text"
            id={`entity-${isSupplier ? "supplier" : "transporter"}`}
            name="entity"
            value={data.entity}
            onChange={handleChange}
            placeholder={`Nome ${isSupplier ? "do fornecedor" : "da transportadora"}`}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`paymentMethod-${isSupplier ? "supplier" : "transporter"}`}>Método de Pagamento</label>
          <select
            id={`paymentMethod-${isSupplier ? "supplier" : "transporter"}`}
            name="paymentMethod"
            value={data.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Selecione o método</option>
            <option value="bank-transfer">💳 Transferência Bancária</option>
            <option value="paypal">💰 PayPal</option>
            <option value="cash">💵 Dinheiro</option>
            <option value="check">📝 Cheque</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`status-${isSupplier ? "supplier" : "transporter"}`}>Estado</label>
          <select
            id={`status-${isSupplier ? "supplier" : "transporter"}`}
            name="status"
            value={data.status}
            onChange={handleChange}
          >
            <option value="pending">⏳ Pendente</option>
            <option value="paid">✅ Pago</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`description-${isSupplier ? "supplier" : "transporter"}`}>Descrição</label>
          <textarea
            id={`description-${isSupplier ? "supplier" : "transporter"}`}
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder={`Descrição da fatura ${isSupplier ? "do fornecedor" : "da transportadora"}...`}
            rows={4}
          />
        </div>
      </div>
    </div>
  )

  const currentFiles = activeTab === "supplier" ? supplierFiles : transporterFiles

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="gradient-text">✏️ Editar Fatura</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="invoice-form">
          {/* Separadores/Tabs */}
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                type="button"
                className={`tab-button ${activeTab === "supplier" ? "active" : ""} ${
                  supplierData.invoiceNumber || supplierData.amount ? "has-data" : ""
                }`}
                onClick={() => setActiveTab("supplier")}
              >
                🏢 FORNECEDOR
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === "transporter" ? "active" : ""} ${
                  transporterData.invoiceNumber || transporterData.amount ? "has-data" : ""
                }`}
                onClick={() => setActiveTab("transporter")}
              >
                🚛 TRANSPORTADORA
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "supplier" ? (
                <div className="tab-panel">
                  <h3 className="tab-title">📋 Editar Dados do Fornecedor</h3>
                  {renderFormFields(
                    supplierData,
                    handleSupplierInputChange,
                    supplierExchangeRate,
                    supplierConvertedAmount,
                    true,
                  )}
                </div>
              ) : (
                <div className="tab-panel">
                  <h3 className="tab-title">📋 Editar Dados da Transportadora</h3>
                  {renderFormFields(
                    transporterData,
                    handleTransporterInputChange,
                    transporterExchangeRate,
                    transporterConvertedAmount,
                    false,
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Upload de Arquivos */}
          <div className="form-group full-width">
            <label>📎 Documentos - {activeTab === "supplier" ? "Fornecedor" : "Transportadora"}</label>
            <div
              className={`file-upload-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <div className="upload-icon">📎</div>
                <p>Arraste e solte arquivos aqui ou</p>
                <label htmlFor="file-input-edit" className="upload-button">
                  Escolher Arquivos
                </label>
                <input
                  type="file"
                  id="file-input-edit"
                  multiple
                  onChange={handleFileInput}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  style={{ display: "none" }}
                />
                <p className="upload-hint">PDF, Imagens, Word, Excel (máx. 10MB cada)</p>
              </div>
            </div>

            {currentFiles.length > 0 && (
              <div className="file-list">
                <h4>
                  📁 Novos Arquivos - {activeTab === "supplier" ? "Fornecedor" : "Transportadora"} (
                  {currentFiles.length}):
                </h4>
                {currentFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <span className="file-icon">
                        {file.type.includes("pdf")
                          ? "📄"
                          : file.type.includes("image")
                            ? "🖼️"
                            : file.type.includes("word")
                              ? "📝"
                              : file.type.includes("excel")
                                ? "📊"
                                : "📎"}
                      </span>
                      <div>
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button type="button" className="remove-file-btn" onClick={() => removeFile(index)}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
              ❌ Cancelar
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "⏳ Salvando..." : "💾 Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Função auxiliar para formatar tamanho de arquivo
function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " bytes"
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  else return (bytes / 1048576).toFixed(1) + " MB"
}

// Componente Fornecedores
function Suppliers() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">🏢 Fornecedores</h1>
          <p className="subtitle">Gestão de fornecedores</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Novo Fornecedor
        </button>
      </div>

      <div className="content-card">
        <h3>Lista de Fornecedores</h3>
        <div className="table-simple">
          <div className="table-row header">
            <span>Nome</span>
            <span>Contacto</span>
            <span>Email</span>
            <span>NIF</span>
          </div>
          <div className="table-row">
            <span>Materiais ABC</span>
            <span>João Silva</span>
            <span>joao@materiaisabc.pt</span>
            <span>PT123456789</span>
          </div>
          <div className="table-row">
            <span>Fornecedor XYZ</span>
            <span>Ana Costa</span>
            <span>ana@xyz.pt</span>
            <span>PT234567890</span>
          </div>
          <div className="table-row">
            <span>Materiais Premium</span>
            <span>Carlos Oliveira</span>
            <span>carlos@premium.pt</span>
            <span>PT345678901</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="gradient-text">🏢 Novo Fornecedor</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <p>Formulário de novo fornecedor será implementado aqui.</p>
              <button className="primary-button" onClick={() => setShowForm(false)} style={{ marginTop: "1rem" }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente Transportadoras
function Transporters() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">🚛 Transportadoras</h1>
          <p className="subtitle">Gestão de transportadoras</p>
        </div>
        <button className="primary-button" onClick={() => setShowForm(true)}>
          + Nova Transportadora
        </button>
      </div>

      <div className="content-card">
        <h3>Lista de Transportadoras</h3>
        <div className="table-simple">
          <div className="table-row header">
            <span>Nome</span>
            <span>Contacto</span>
            <span>Email</span>
            <span>NIF</span>
          </div>
          <div className="table-row">
            <span>Transportes Rápidos</span>
            <span>Pedro Almeida</span>
            <span>pedro@transportesrapidos.pt</span>
            <span>PT123456789</span>
          </div>
          <div className="table-row">
            <span>Logística Global</span>
            <span>Marta Sousa</span>
            <span>marta@logisticaglobal.pt</span>
            <span>PT234567890</span>
          </div>
          <div className="table-row">
            <span>Entregas Expressas</span>
            <span>Ricardo Ferreira</span>
            <span>ricardo@entregasexpressas.pt</span>
            <span>PT345678901</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="gradient-text">🚛 Nova Transportadora</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <p>Formulário de nova transportadora será implementado aqui.</p>
              <button className="primary-button" onClick={() => setShowForm(false)} style={{ marginTop: "1rem" }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente do Formulário de Nova Fatura com Separadores
function NewInvoiceForm({ onClose, onSave }: { onClose: () => void; onSave: (data: any) => void }) {
  const [activeTab, setActiveTab] = useState("supplier") // "supplier" ou "transporter"

  // Dados do fornecedor
  const [supplierData, setSupplierData] = useState({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    amount: "",
    currency: "EUR",
    entity: "",
    description: "",
    paymentMethod: "",
  })

  // Dados da transportadora
  const [transporterData, setTransporterData] = useState({
    invoiceNumber: "",
    date: "",
    dueDate: "",
    amount: "",
    currency: "EUR",
    entity: "",
    description: "",
    paymentMethod: "",
  })

  // Estados para conversão (mantidos separados para cada tab)
  const [supplierExchangeRate, setSupplierExchangeRate] = useState(1.1)
  const [supplierConvertedAmount, setSupplierConvertedAmount] = useState("")
  const [transporterExchangeRate, setTransporterExchangeRate] = useState(1.1)
  const [transporterConvertedAmount, setTransporterConvertedAmount] = useState("")
  const [isLoadingRate, setIsLoadingRate] = useState(false)

  const [supplierFiles, setSupplierFiles] = useState<File[]>([])
  const [transporterFiles, setTransporterFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Função para buscar taxa de câmbio
  const fetchExchangeRate = async (currency: string, isSupplier: boolean) => {
    setIsLoadingRate(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const rate = currency === "EUR" ? 1.1 : 0.91
      if (isSupplier) {
        setSupplierExchangeRate(rate)
      } else {
        setTransporterExchangeRate(rate)
      }
    } catch (error) {
      console.error("Erro ao buscar taxa de câmbio:", error)
    } finally {
      setIsLoadingRate(false)
    }
  }

  // Função para calcular conversão
  const calculateConversion = (amount: string, exchangeRate: number, isSupplier: boolean) => {
    if (amount && exchangeRate) {
      const amountNum = Number.parseFloat(amount)
      const converted = (amountNum * exchangeRate).toFixed(2)
      if (isSupplier) {
        setSupplierConvertedAmount(converted)
      } else {
        setTransporterConvertedAmount(converted)
      }
    } else {
      if (isSupplier) {
        setSupplierConvertedAmount("")
      } else {
        setTransporterConvertedAmount("")
      }
    }
  }

  // Effects para recalcular conversões
  React.useEffect(() => {
    if (supplierData.currency) {
      fetchExchangeRate(supplierData.currency, true)
    }
  }, [supplierData.currency])

  React.useEffect(() => {
    if (transporterData.currency) {
      fetchExchangeRate(transporterData.currency, false)
    }
  }, [transporterData.currency])

  React.useEffect(() => {
    calculateConversion(supplierData.amount, supplierExchangeRate, true)
  }, [supplierData.amount, supplierExchangeRate])

  React.useEffect(() => {
    calculateConversion(transporterData.amount, transporterExchangeRate, false)
  }, [transporterData.amount, transporterExchangeRate])

  // Handlers para mudanças nos inputs
  const handleSupplierInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTransporterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setTransporterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handlers para drag and drop (separados por tab)
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      if (activeTab === "supplier") {
        setSupplierFiles((prev) => [...prev, ...newFiles])
      } else {
        setTransporterFiles((prev) => [...prev, ...newFiles])
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      if (activeTab === "supplier") {
        setSupplierFiles((prev) => [...prev, ...newFiles])
      } else {
        setTransporterFiles((prev) => [...prev, ...newFiles])
      }
    }
  }

  const removeFile = (index: number) => {
    if (activeTab === "supplier") {
      setSupplierFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setTransporterFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const generateInvoiceId = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substr(2, 3).toUpperCase()
    return `INV-${timestamp}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar dados do fornecedor se preenchidos
    const hasSupplierData = supplierData.invoiceNumber || supplierData.amount || supplierData.entity
    const hasTransporterData = transporterData.invoiceNumber || transporterData.amount || transporterData.entity

    if (!hasSupplierData && !hasTransporterData) {
      alert("❌ Por favor, preencha pelo menos uma seção (Fornecedor ou Transportadora)!")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const invoices = []

      // Criar fatura do fornecedor se tiver dados
      if (hasSupplierData) {
        if (!supplierData.invoiceNumber || !supplierData.amount) {
          alert("❌ Por favor, preencha número da fatura e valor para o Fornecedor!")
          setIsSubmitting(false)
          return
        }

        const supplierInvoice = {
          id: supplierData.invoiceNumber || generateInvoiceId(),
          supplier: supplierData.entity || "Fornecedor",
          date: supplierData.date
            ? new Date(supplierData.date).toLocaleDateString("pt-PT")
            : new Date().toLocaleDateString("pt-PT"),
          dueDate: supplierData.dueDate ? new Date(supplierData.dueDate).toLocaleDateString("pt-PT") : "",
          amount: Number.parseFloat(supplierData.amount),
          currency: supplierData.currency,
          convertedAmount: supplierConvertedAmount ? Number.parseFloat(supplierConvertedAmount) : null,
          exchangeRate: supplierExchangeRate,
          status: "pending",
          entityType: "supplier",
          description: supplierData.description || "Fatura de fornecedor",
          paymentMethod: supplierData.paymentMethod || "Não especificado",
          files: {
            supplier: supplierFiles.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
            })),
            transporter: [],
          },
          createdAt: new Date().toISOString(),
        }
        invoices.push(supplierInvoice)
      }

      // Criar fatura da transportadora se tiver dados
      if (hasTransporterData) {
        if (!transporterData.invoiceNumber || !transporterData.amount) {
          alert("❌ Por favor, preencha número da fatura e valor para a Transportadora!")
          setIsSubmitting(false)
          return
        }

        const transporterInvoice = {
          id: transporterData.invoiceNumber || generateInvoiceId(),
          supplier: transporterData.entity || "Transportadora",
          date: transporterData.date
            ? new Date(transporterData.date).toLocaleDateString("pt-PT")
            : new Date().toLocaleDateString("pt-PT"),
          dueDate: transporterData.dueDate ? new Date(transporterData.dueDate).toLocaleDateString("pt-PT") : "",
          amount: Number.parseFloat(transporterData.amount),
          currency: transporterData.currency,
          convertedAmount: transporterConvertedAmount ? Number.parseFloat(transporterConvertedAmount) : null,
          exchangeRate: transporterExchangeRate,
          status: "pending",
          entityType: "transporter",
          description: transporterData.description || "Fatura de transportadora",
          paymentMethod: transporterData.paymentMethod || "Não especificado",
          files: {
            supplier: [],
            transporter: transporterFiles.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
            })),
          },
          createdAt: new Date().toISOString(),
        }
        invoices.push(transporterInvoice)
      }

      // Salvar todas as faturas criadas
      for (const invoice of invoices) {
        console.log("📄 Dados da fatura criada:", invoice)
        onSave(invoice)
      }

      onClose()
    } catch (error) {
      console.error("❌ Erro ao criar fatura:", error)
      alert("❌ Erro ao criar fatura. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Função para renderizar os campos do formulário
  const renderFormFields = (
    data: any,
    handleChange: any,
    exchangeRate: number,
    convertedAmount: string,
    isSupplier: boolean,
  ) => (
    <div className="form-grid">
      <div className="form-column">
        <div className="form-group">
          <label htmlFor={`invoiceNumber-${isSupplier ? "supplier" : "transporter"}`}>Número da Fatura *</label>
          <input
            type="text"
            id={`invoiceNumber-${isSupplier ? "supplier" : "transporter"}`}
            name="invoiceNumber"
            value={data.invoiceNumber}
            onChange={handleChange}
            placeholder={`Ex: ${isSupplier ? "FORN" : "TRANS"}-2024-001`}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`date-${isSupplier ? "supplier" : "transporter"}`}>Data da Fatura</label>
          <input
            type="date"
            id={`date-${isSupplier ? "supplier" : "transporter"}`}
            name="date"
            value={data.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`dueDate-${isSupplier ? "supplier" : "transporter"}`}>Data de Vencimento</label>
          <input
            type="date"
            id={`dueDate-${isSupplier ? "supplier" : "transporter"}`}
            name="dueDate"
            value={data.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`currency-${isSupplier ? "supplier" : "transporter"}`}>Moeda</label>
          <select
            id={`currency-${isSupplier ? "supplier" : "transporter"}`}
            name="currency"
            value={data.currency}
            onChange={handleChange}
          >
            <option value="EUR">💶 Euro (EUR)</option>
            <option value="USD">💵 Dólar (USD)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`amount-${isSupplier ? "supplier" : "transporter"}`}>
            Valor ({data.currency}) *{isLoadingRate && <span className="loading-indicator"> ⏳</span>}
          </label>
          <div className="currency-input-container">
            <input
              type="number"
              id={`amount-${isSupplier ? "supplier" : "transporter"}`}
              name="amount"
              value={data.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="currency-input"
            />
            <span className="currency-symbol">{data.currency === "EUR" ? "€" : "$"}</span>
          </div>

          {/* Conversor de Moeda */}
          {data.amount && convertedAmount && (
            <div className="currency-converter">
              <div className="conversion-display">
                <span className="original-amount">
                  {data.currency === "EUR" ? "€" : "$"}
                  {data.amount}
                </span>
                <span className="conversion-arrow">⇄</span>
                <span className="converted-amount">
                  {data.currency === "EUR" ? "$" : "€"}
                  {convertedAmount}
                </span>
              </div>
              <div className="exchange-rate">
                Taxa: 1 {data.currency} = {exchangeRate} {data.currency === "EUR" ? "USD" : "EUR"}
                <button
                  type="button"
                  className="refresh-rate-btn"
                  onClick={() => fetchExchangeRate(data.currency, isSupplier)}
                  disabled={isLoadingRate}
                >
                  🔄
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-column">
        <div className="form-group">
          <label htmlFor={`entity-${isSupplier ? "supplier" : "transporter"}`}>
            {isSupplier ? "Fornecedor" : "Transportadora"}
          </label>
          <select
            id={`entity-${isSupplier ? "supplier" : "transporter"}`}
            name="entity"
            value={data.entity}
            onChange={handleChange}
          >
            <option value="">Selecione {isSupplier ? "o fornecedor" : "a transportadora"}</option>
            {isSupplier ? (
              <>
                <option value="Materiais ABC">Materiais ABC</option>
                <option value="Fornecedor XYZ">Fornecedor XYZ</option>
                <option value="Materiais Premium">Materiais Premium</option>
              </>
            ) : (
              <>
                <option value="Transportes Rápidos">Transportes Rápidos</option>
                <option value="Logística Global">Logística Global</option>
                <option value="Entregas Expressas">Entregas Expressas</option>
              </>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`paymentMethod-${isSupplier ? "supplier" : "transporter"}`}>Método de Pagamento</label>
          <select
            id={`paymentMethod-${isSupplier ? "supplier" : "transporter"}`}
            name="paymentMethod"
            value={data.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Selecione o método</option>
            <option value="bank-transfer">💳 Transferência Bancária</option>
            <option value="paypal">💰 PayPal</option>
            <option value="cash">💵 Dinheiro</option>
            <option value="check">📝 Cheque</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor={`description-${isSupplier ? "supplier" : "transporter"}`}>Descrição</label>
          <textarea
            id={`description-${isSupplier ? "supplier" : "transporter"}`}
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder={`Descrição da fatura ${isSupplier ? "do fornecedor" : "da transportadora"}...`}
            rows={4}
          />
        </div>
      </div>
    </div>
  )

  const currentFiles = activeTab === "supplier" ? supplierFiles : transporterFiles

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="gradient-text">📄 Nova Fatura</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="invoice-form">
          {/* Separadores/Tabs */}
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                type="button"
                className={`tab-button ${activeTab === "supplier" ? "active" : ""}`}
                onClick={() => setActiveTab("supplier")}
              >
                🏢 FORNECEDOR
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === "transporter" ? "active" : ""}`}
                onClick={() => setActiveTab("transporter")}
              >
                🚛 TRANSPORTADORA
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "supplier" ? (
                <div className="tab-panel">
                  <h3 className="tab-title">📋 Dados do Fornecedor</h3>
                  {renderFormFields(
                    supplierData,
                    handleSupplierInputChange,
                    supplierExchangeRate,
                    supplierConvertedAmount,
                    true,
                  )}
                </div>
              ) : (
                <div className="tab-panel">
                  <h3 className="tab-title">📋 Dados da Transportadora</h3>
                  {renderFormFields(
                    transporterData,
                    handleTransporterInputChange,
                    transporterExchangeRate,
                    transporterConvertedAmount,
                    false,
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Upload de Arquivos */}
          <div className="form-group full-width">
            <label>📎 Documentos - {activeTab === "supplier" ? "Fornecedor" : "Transportadora"}</label>
            <div
              className={`file-upload-area ${dragActive ? "drag-active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <div className="upload-icon">📎</div>
                <p>Arraste e solte arquivos aqui ou</p>
                <label htmlFor="file-input" className="upload-button">
                  Escolher Arquivos
                </label>
                <input
                  type="file"
                  id="file-input"
                  multiple
                  onChange={handleFileInput}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  style={{ display: "none" }}
                />
                <p className="upload-hint">PDF, Imagens, Word, Excel (máx. 10MB cada)</p>
              </div>
            </div>

            {currentFiles.length > 0 && (
              <div className="file-list">
                <h4>
                  📁 Arquivos Anexados - {activeTab === "supplier" ? "Fornecedor" : "Transportadora"} (
                  {currentFiles.length}):
                </h4>
                {currentFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <span className="file-icon">
                        {file.type.includes("pdf")
                          ? "📄"
                          : file.type.includes("image")
                            ? "🖼️"
                            : file.type.includes("word")
                              ? "📝"
                              : file.type.includes("excel")
                                ? "📊"
                                : "📎"}
                      </span>
                      <div>
                        <p className="file-name">{file.name}</p>
                        <p className="file-size">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button type="button" className="remove-file-btn" onClick={() => removeFile(index)}>
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
              ❌ Cancelar
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "⏳ Criando..." : "💾 Criar Fatura(s)"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App

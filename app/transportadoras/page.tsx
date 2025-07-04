"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Truck,
  Mail,
  Phone,
  MapPin,
  Package,
} from "lucide-react"

export default function Transportadoras() {
  const [searchTerm, setSearchTerm] = useState("")

  const [transportadoras, setTransportadoras] = useState([
    {
      id: 1,
      nome: "TransLogística Lda",
      email: "info@translogistica.pt",
      nif: "501234567",
      telefone: "+351 915 123 456",
      morada: "Zona Industrial, Lote 15, Aveiro",
      entregas: 45,
      valorTotal: 8750.25,
      status: "Ativo",
      tipoServico: "Nacional",
      rating: 4.8,
    },
    {
      id: 2,
      nome: "RodoExpress SA",
      email: "comercial@rodoexpress.pt",
      nif: "502987654",
      telefone: "+351 916 234 567",
      morada: "Estrada Nacional 1, Km 25, Santarém",
      entregas: 32,
      valorTotal: 6420.8,
      status: "Ativo",
      tipoServico: "Internacional",
      rating: 4.5,
    },
    {
      id: 3,
      nome: "CargoFast Transportes",
      email: "geral@cargofast.pt",
      nif: "503555123",
      telefone: "+351 917 345 678",
      morada: "Parque Logístico, Pavilhão C, Leiria",
      entregas: 28,
      valorTotal: 5890.4,
      status: "Inativo",
      tipoServico: "Expresso",
      rating: 4.2,
    },
  ])

  const filteredTransportadoras = transportadoras.filter(
    (transportadora) =>
      transportadora.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transportadora.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transportadora.nif.includes(searchTerm),
  )

  const deleteTransportadora = (id: number) => {
    setTransportadoras(transportadoras.filter((t) => t.id !== id))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-600"}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="glass p-3 rounded-xl hover-lift">
                <ArrowLeft className="w-5 h-5 text-pink-400" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">Gestão de Transportadoras</h1>
                <p className="text-gray-400 mt-1">Controle total sobre suas transportadoras</p>
              </div>
            </div>
            <button className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Transportadora
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar transportadoras..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
              />
            </div>
            <button className="glass px-4 py-3 rounded-xl hover-lift flex items-center gap-2">
              <Filter className="w-5 h-5 text-pink-400" />
              Filtros
            </button>
            <button className="glass px-4 py-3 rounded-xl hover-lift flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              Exportar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">{filteredTransportadoras.length}</div>
            <div className="text-gray-400">Total</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {filteredTransportadoras.filter((t) => t.status === "Ativo").length}
            </div>
            <div className="text-gray-400">Ativas</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {filteredTransportadoras.reduce((sum, t) => sum + t.entregas, 0)}
            </div>
            <div className="text-gray-400">Entregas</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              €{filteredTransportadoras.reduce((sum, t) => sum + t.valorTotal, 0).toLocaleString("pt-PT")}
            </div>
            <div className="text-gray-400">Valor Total</div>
          </div>
        </div>

        {/* Transportadoras Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTransportadoras.map((transportadora) => (
            <div key={transportadora.id} className="glass rounded-2xl p-6 hover-lift card-hover">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center">
                    <Truck className="w-8 h-8 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{transportadora.nome}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transportadora.status === "Ativo"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {transportadora.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400">
                        {transportadora.tipoServico}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">{renderStars(transportadora.rating)}</div>
                  <div className="text-gray-400 text-sm">{transportadora.rating}/5.0</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span className="text-sm">{transportadora.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-pink-400" />
                  <span className="text-sm">{transportadora.telefone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span className="text-sm">{transportadora.morada}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-pink-400" />
                    <span className="text-gray-400 text-sm">Entregas</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{transportadora.entregas}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-pink-400 text-sm">€</span>
                    <span className="text-gray-400 text-sm">Valor Total</span>
                  </div>
                  <div className="text-2xl font-bold text-pink-400">
                    €{transportadora.valorTotal.toLocaleString("pt-PT")}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 glass py-3 px-4 rounded-xl hover-lift flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">Ver Detalhes</span>
                </button>
                <button className="flex-1 glass py-3 px-4 rounded-xl hover-lift flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">Editar</span>
                </button>
                <button
                  onClick={() => deleteTransportadora(transportadora.id)}
                  className="glass py-3 px-4 rounded-xl hover-lift"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTransportadoras.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-gray-400 text-lg mb-4">Nenhuma transportadora encontrada</div>
            <p className="text-gray-500">Tente ajustar a pesquisa ou adicionar uma nova transportadora</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Plus, Search, Filter, Download, Eye, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react"

export default function Fornecedores() {
  const [searchTerm, setSearchTerm] = useState("")

  const [fornecedores, setFornecedores] = useState([
    {
      id: 1,
      nome: "Fornecedor A",
      email: "contato@fornecedora.com",
      nif: "123456789",
      telefone: "+351 912 345 678",
      morada: "Rua das Flores, 123, Lisboa",
      faturas: 15,
      valorTotal: 12450.5,
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Fornecedor B",
      email: "info@fornecedorb.com",
      nif: "987654321",
      telefone: "+351 913 456 789",
      morada: "Av. da Liberdade, 456, Porto",
      faturas: 8,
      valorTotal: 8750.3,
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Fornecedor C",
      email: "vendas@fornecedorc.com",
      nif: "555123456",
      telefone: "+351 914 567 890",
      morada: "Praça do Comércio, 789, Coimbra",
      faturas: 22,
      valorTotal: 18900.75,
      status: "Inativo",
    },
  ])

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.nif.includes(searchTerm),
  )

  const deleteFornecedor = (id: number) => {
    setFornecedores(fornecedores.filter((f) => f.id !== id))
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="glass p-3 rounded-xl hover-lift">
                <ArrowLeft className="w-5 h-5 text-purple-400" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">Gestão de Fornecedores</h1>
                <p className="text-gray-400 mt-1">Gerir a sua rede de fornecedores</p>
              </div>
            </div>
            <button className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Fornecedor
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
                placeholder="Pesquisar fornecedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
              />
            </div>
            <button className="glass px-4 py-3 rounded-xl hover-lift flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-400" />
              Filtros
            </button>
            <button className="glass px-4 py-3 rounded-xl hover-lift flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              Exportar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-2">{filteredFornecedores.length}</div>
            <div className="text-gray-400">Total de Fornecedores</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {filteredFornecedores.filter((f) => f.status === "Ativo").length}
            </div>
            <div className="text-gray-400">Fornecedores Ativos</div>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              €{filteredFornecedores.reduce((sum, f) => sum + f.valorTotal, 0).toLocaleString("pt-PT")}
            </div>
            <div className="text-gray-400">Valor Total</div>
          </div>
        </div>

        {/* Fornecedores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFornecedores.map((fornecedor) => (
            <div key={fornecedor.id} className="glass rounded-2xl p-6 hover-lift card-hover">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-lg">{fornecedor.nome.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{fornecedor.nome}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        fornecedor.status === "Ativo" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {fornecedor.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{fornecedor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{fornecedor.telefone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">{fornecedor.morada}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{fornecedor.faturas}</div>
                  <div className="text-gray-400 text-xs">Faturas</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-lg font-bold text-purple-400">
                    €{fornecedor.valorTotal.toLocaleString("pt-PT")}
                  </div>
                  <div className="text-gray-400 text-xs">Valor Total</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 glass py-2 px-3 rounded-lg hover-lift flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Ver</span>
                </button>
                <button className="flex-1 glass py-2 px-3 rounded-lg hover-lift flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Editar</span>
                </button>
                <button
                  onClick={() => deleteFornecedor(fornecedor.id)}
                  className="glass py-2 px-3 rounded-lg hover-lift"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredFornecedores.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="text-gray-400 text-lg mb-4">Nenhum fornecedor encontrado</div>
            <p className="text-gray-500">Tente ajustar a pesquisa ou adicionar um novo fornecedor</p>
          </div>
        )}
      </div>
    </div>
  )
}

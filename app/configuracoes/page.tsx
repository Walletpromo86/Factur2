import Link from "next/link"
import { ArrowLeft, Settings, Save, User, Bell, Shield, Database } from "lucide-react"

export default function Configuracoes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Configurações do Sistema
            </h1>
            <p className="text-gray-300 mt-2">Personalize as definições da sua aplicação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Menu */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-pink-400" />
              Categorias
            </h3>
            <div className="space-y-2">
              {[
                { icon: User, label: "Perfil de Utilizador", active: true },
                { icon: Bell, label: "Notificações", active: false },
                { icon: Shield, label: "Segurança", active: false },
                { icon: Database, label: "Base de Dados", active: false },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-pink-400" />
              Perfil de Utilizador
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    defaultValue="Administrador do Sistema"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@sistema.pt"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Empresa</label>
                  <input
                    type="text"
                    defaultValue="Sistema de Gestão Lda"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">NIF da Empresa</label>
                  <input
                    type="text"
                    defaultValue="123456789"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Morada da Empresa</label>
                <textarea
                  rows={3}
                  defaultValue="Rua Principal, 123, 1000-000 Lisboa, Portugal"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                  <input
                    type="tel"
                    defaultValue="+351 210 123 456"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
                  <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="Europe/Lisbon">Europa/Lisboa (GMT+0)</option>
                    <option value="Europe/London">Europa/Londres (GMT+0)</option>
                    <option value="Europe/Madrid">Europa/Madrid (GMT+1)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Preferências do Sistema</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Notificações por Email</p>
                      <p className="text-gray-400 text-sm">Receber alertas sobre faturas vencidas</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Backup Automático</p>
                      <p className="text-gray-400 text-sm">Backup diário dos dados do sistema</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Modo Escuro</p>
                      <p className="text-gray-400 text-sm">Interface com tema escuro</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  Guardar Alterações
                </button>
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

# 🧾 Sistema de Gestão de Faturas

Um sistema completo para gestão de faturas, fornecedores e transportadoras, desenvolvido com Next.js 14 e Tailwind CSS.

## ✨ Funcionalidades

- 📊 **Dashboard** com estatísticas em tempo real
- 🧾 **Gestão de Faturas** - criar, editar, visualizar
- 🏢 **Gestão de Fornecedores** - cadastro completo
- 🚛 **Gestão de Transportadoras** - controle de entregas
- 📄 **Upload de Documentos** - anexar PDFs e imagens
- 📱 **Design Responsivo** - funciona em todos os dispositivos
- 🌙 **Modo Escuro** - interface moderna

## 🚀 Deploy Rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU_USUARIO/sistema-gestao-faturas)

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Linguagem**: TypeScript
- **Storage**: Vercel Blob (para documentos)
- **Deploy**: Vercel

## 📦 Instalação Local

\`\`\`bash
# Clonar repositório
git clone https://github.com/SEU_USUARIO/sistema-gestao-faturas.git

# Entrar na pasta
cd sistema-gestao-faturas

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
\`\`\`

Acesse: http://localhost:3000

## 🌐 Deploy Online

Siga o guia completo em [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md)

### Resumo Rápido:
1. Criar repositório no GitHub
2. Fazer push do código
3. Conectar na Vercel
4. Deploy automático!

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── faturas/           # Páginas de faturas
│   ├── fornecedores/      # Páginas de fornecedores
│   └── transportadoras/   # Páginas de transportadoras
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   └── ...               # Componentes customizados
├── contexts/             # Context API
├── hooks/                # Custom hooks
└── lib/                  # Utilitários
\`\`\`

## 🔧 Configuração

### Variáveis de Ambiente
\`\`\`env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

## 📱 Screenshots

### Dashboard
![Dashboard](/placeholder.svg?height=400&width=800&query=dashboard+sistema+faturas)

### Lista de Faturas
![Faturas](/placeholder.svg?height=400&width=800&query=lista+faturas+tabela)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- 📧 Email: seu-email@exemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/SEU_USUARIO/sistema-gestao-faturas/issues)
- 📖 Documentação: [Wiki](https://github.com/SEU_USUARIO/sistema-gestao-faturas/wiki)

---

⭐ **Se este projeto te ajudou, deixe uma estrela no GitHub!**

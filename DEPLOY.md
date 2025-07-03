# 🚀 Guia de Deploy - Sistema de Gestão de Faturas

## Pré-requisitos
- Conta no GitHub
- Conta na Vercel
- Node.js 18+ instalado localmente

## 📋 Passos para Deploy

### 1. Preparar o Repositório GitHub
\`\`\`bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit - Invoice Management System"

# Conectar ao repositório GitHub
git remote add origin https://github.com/SEU_USUARIO/invoice-management.git

# Enviar código para GitHub
git push -u origin main
\`\`\`

### 2. Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione o repositório do projeto
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

### 3. Configurar Variáveis de Ambiente
Na Vercel Dashboard:
- `BLOB_READ_WRITE_TOKEN`: Token do Vercel Blob
- `NEXT_PUBLIC_APP_URL`: URL do seu site

### 4. Configurar Domínio Personalizado (Opcional)
1. Na Vercel Dashboard, vá em "Domains"
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

## 🔄 Atualizações Futuras
Para fazer updates:
\`\`\`bash
# Fazer alterações no código
# Adicionar mudanças
git add .

# Commit das mudanças
git commit -m "Descrição da atualização"

# Enviar para GitHub
git push

# A Vercel fará deploy automático!
\`\`\`

## 🛠️ Comandos Úteis
\`\`\`bash
# Testar build localmente
npm run build

# Verificar tipos TypeScript
npm run type-check

# Executar linting
npm run lint
\`\`\`

## 📞 Suporte
- Documentação Vercel: https://vercel.com/docs
- Documentação Next.js: https://nextjs.org/docs

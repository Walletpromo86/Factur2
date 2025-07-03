# 🚀 Guia Completo de Deploy - Sistema de Gestão de Faturas

## 📋 Pré-requisitos
- Conta no GitHub (gratuita)
- Conta na Vercel (gratuita)
- Git instalado no seu computador

## 🔧 Passo 1: Preparar o Projeto

### 1.1 Verificar se o Git está instalado
\`\`\`bash
git --version
\`\`\`

### 1.2 Inicializar repositório Git (na pasta do projeto)
\`\`\`bash
# Navegar para a pasta do projeto
cd caminho/para/seu/projeto

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Sistema de Gestão de Faturas"
\`\`\`

## 🐙 Passo 2: Criar Repositório no GitHub

### 2.1 Criar novo repositório
1. Acesse [github.com](https://github.com)
2. Clique em "New repository" (botão verde)
3. Nome do repositório: `sistema-gestao-faturas`
4. Deixe como **público** (para conta gratuita)
5. **NÃO** marque "Add a README file"
6. Clique em "Create repository"

### 2.2 Conectar projeto local ao GitHub
\`\`\`bash
# Conectar ao repositório GitHub (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/sistema-gestao-faturas.git

# Enviar código para GitHub
git branch -M main
git push -u origin main
\`\`\`

## 🚀 Passo 3: Deploy na Vercel

### 3.1 Criar conta na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize a Vercel a acessar seus repositórios

### 3.2 Fazer Deploy
1. No dashboard da Vercel, clique em "New Project"
2. Encontre o repositório `sistema-gestao-faturas`
3. Clique em "Import"
4. **Framework Preset**: Next.js (deve detectar automaticamente)
5. **Root Directory**: deixe como está (.)
6. Clique em "Deploy"

### 3.3 Aguardar Deploy
- O processo leva 2-5 minutos
- Você verá logs em tempo real
- Quando terminar, receberá um link do seu site!

## 🔧 Passo 4: Configurar Armazenamento (Opcional)

Para upload de documentos, você precisa configurar o Vercel Blob:

### 4.1 Ativar Vercel Blob
1. No dashboard da Vercel, vá em seu projeto
2. Clique na aba "Storage"
3. Clique em "Create Database"
4. Escolha "Blob"
5. Aceite os termos e crie

### 4.2 Configurar Variável de Ambiente
1. Vá em "Settings" > "Environment Variables"
2. Adicione:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: (será gerado automaticamente quando criar o Blob)
3. Clique em "Save"

## 🔄 Passo 5: Atualizações Futuras

Para fazer mudanças no site:

\`\`\`bash
# 1. Fazer suas alterações no código
# 2. Adicionar mudanças ao Git
git add .

# 3. Fazer commit
git commit -m "Descrição da sua mudança"

# 4. Enviar para GitHub
git push

# 5. A Vercel fará deploy automático em ~2 minutos!
\`\`\`

## 🌐 Passo 6: Domínio Personalizado (Opcional)

### 6.1 Usar domínio próprio
1. Na Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Aguarde propagação (até 24h)

### 6.2 Subdomínio gratuito
A Vercel fornece automaticamente um domínio como:
`sistema-gestao-faturas-seu-usuario.vercel.app`

## 🛠️ Comandos Úteis

\`\`\`bash
# Testar build localmente antes do deploy
npm run build
npm start

# Verificar erros
npm run lint

# Ver status do Git
git status

# Ver histórico de commits
git log --oneline
\`\`\`

## ❗ Solução de Problemas

### Build falhou?
1. Teste localmente: `npm run build`
2. Corrija erros mostrados
3. Faça commit e push novamente

### Site não carrega?
1. Verifique logs na Vercel Dashboard
2. Vá em "Functions" > "View Function Logs"

### Erro de dependências?
1. Delete `node_modules` e `package-lock.json`
2. Execute `npm install`
3. Teste localmente
4. Faça commit e push

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Docs**: https://docs.github.com

## ✅ Checklist Final

- [ ] Projeto no GitHub
- [ ] Deploy na Vercel funcionando
- [ ] Site acessível via URL
- [ ] Blob configurado (se necessário)
- [ ] Domínio configurado (opcional)

**🎉 Parabéns! Seu sistema está online!**

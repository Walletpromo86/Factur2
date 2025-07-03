# 🚀 Guia de Deploy - Correção de Dependências

## Problema
Conflito entre `react-day-picker` e `date-fns` que impede o deploy.

## Solução Implementada

### 1. Package.json Limpo
- Removidas todas as dependências problemáticas
- Adicionados `overrides` e `resolutions` para forçar resolução

### 2. Configuração .npmrc
- `legacy-peer-deps=true` - Permite dependências legadas
- `auto-install-peers=false` - Evita instalação automática
- `strict-peer-deps=false` - Relaxa verificação de peers

### 3. Vercel.json
- Comando de build customizado com `--legacy-peer-deps`
- Comando de instalação forçado

## Como Fazer Deploy

### Opção 1: Automático (Recomendado)
\`\`\`bash
git add .
git commit -m "Correção definitiva de dependências"
git push
\`\`\`

### Opção 2: Manual Local
\`\`\`bash
# Limpar tudo
rm -rf node_modules package-lock.json

# Instalar com flag
npm install --legacy-peer-deps

# Testar build
npm run build

# Se funcionar, fazer commit
git add .
git commit -m "Deploy fix"
git push
\`\`\`

### Opção 3: Script Automático
\`\`\`bash
chmod +x scripts/clean-install.sh
./scripts/clean-install.sh
\`\`\`

## Verificações
- ✅ Sem `react-day-picker` no package.json
- ✅ Sem `date-fns` no package.json  
- ✅ Flags de compatibilidade ativadas
- ✅ Build local funcionando
- ✅ Vercel configurado para usar --legacy-peer-deps

## Se Ainda Não Funcionar
1. Deletar o projeto na Vercel
2. Criar novo projeto
3. Importar repositório novamente
4. Deploy automático deve funcionar

#!/bin/bash
echo "🧹 Limpando dependências..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

echo "📦 Instalando dependências com --legacy-peer-deps..."
npm install --legacy-peer-deps

echo "🔨 Testando build..."
npm run build

echo "✅ Instalação completa!"

#!/bin/bash

echo "🔧 Fixing deployment issues..."

# Remove node_modules and package-lock.json
echo "📦 Cleaning dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install dependencies
echo "⬇️ Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Deploy fix completed!"
echo "Now you can commit and push to deploy:"
echo "git add ."
echo "git commit -m 'Fix deployment issues'"
echo "git push"

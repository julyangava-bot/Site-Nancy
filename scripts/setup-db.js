#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando banco de dados...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env.local não encontrado!');
  console.log('Por favor, crie o arquivo .env.local com as variáveis de ambiente do Vercel Postgres.');
  process.exit(1);
}

// Load .env.local
require('dotenv').config({ path: envPath });

// Check required env vars
const requiredVars = ['POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente faltando:', missingVars.join(', '));
  console.log('\nAdicione ao seu .env.local:');
  missingVars.forEach(v => console.log(`${v}="sua_url_aqui"`));
  process.exit(1);
}

try {
  // Generate Prisma Client
  console.log('📦 Gerando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Push schema to database
  console.log('\n🔄 Enviando schema para o banco...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('\n✅ Banco de dados configurado com sucesso!');
  console.log('\n🎯 Próximos passos:');
  console.log('1. Execute "npx prisma studio" para ver os dados');
  console.log('2. Acesse /admin no seu site para gerenciar bloqueios');
  console.log('3. Use o token do .env.local para fazer login');

} catch (error) {
  console.error('\n❌ Erro ao configurar banco:', error.message);
  process.exit(1);
}
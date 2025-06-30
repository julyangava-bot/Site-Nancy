# Configuração Local do Prisma

## 1. Gerar o Cliente Prisma

Primeiro, gere o cliente Prisma:

```bash
npx prisma generate
```

## 2. Criar/Atualizar o Banco de Dados

### Opção A: Usando o Banco Remoto (Recomendado para desenvolvimento)

Se você já tem as variáveis de ambiente configuradas no `.env.local` com as credenciais do Vercel Postgres:

```bash
# Push do schema para o banco remoto
npx prisma db push

# Ver o banco no Prisma Studio
npx prisma studio
```

### Opção B: Usando Banco Local (PostgreSQL)

1. **Instale PostgreSQL localmente:**
   - Mac: `brew install postgresql`
   - Windows/Linux: Baixe do site oficial

2. **Crie um banco local:**
```bash
createdb pinkdog_dev
```

3. **Crie um arquivo `.env.local.development`:**
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/pinkdog_dev"
POSTGRES_PRISMA_URL="postgresql://seu_usuario:sua_senha@localhost:5432/pinkdog_dev"
POSTGRES_URL_NON_POOLING="postgresql://seu_usuario:sua_senha@localhost:5432/pinkdog_dev"
```

4. **Execute as migrações:**
```bash
# Criar uma nova migração
npx prisma migrate dev --name init

# Ou apenas push do schema
npx prisma db push
```

## 3. Comandos Úteis do Prisma

```bash
# Ver o banco graficamente
npx prisma studio

# Resetar o banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Ver o status das migrações
npx prisma migrate status

# Gerar o cliente após mudanças no schema
npx prisma generate
```

## 4. Adicionar Dados Iniciais (Seed)

Crie um arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Bloquear dias 3, 4 e 5 de julho de 2025
  const blockedDates = [
    {
      date: new Date('2025-07-03'),
      isFullDay: true,
      service: null,
      reason: 'Capacidade máxima'
    },
    {
      date: new Date('2025-07-04'),
      isFullDay: true,
      service: null,
      reason: 'Feriado - Dia cheio'
    },
    {
      date: new Date('2025-07-05'),
      isFullDay: true,
      service: null,
      reason: 'Capacidade máxima'
    }
  ]

  for (const blocked of blockedDates) {
    await prisma.blockedDate.create({
      data: blocked
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Adicione ao `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Execute o seed:

```bash
npx prisma db seed
```

## 5. Troubleshooting

### Erro de conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o PostgreSQL está rodando (se local)
- Teste a conexão: `npx prisma db pull`

### Erro de geração
- Delete a pasta `lib/generated/prisma`
- Execute `npx prisma generate` novamente

### Erro de migração
- Use `npx prisma migrate reset` para resetar
- Ou `npx prisma db push --force-reset` para forçar
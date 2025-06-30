# Sistema de Bloqueio de Datas - PinkDog

## Configuração Inicial

### 1. Configurar Banco de Dados no Vercel

1. Acesse o painel do Vercel
2. Vá em "Storage" > "Create Database" > "Postgres"
3. Escolha o plano Hobby (gratuito)
4. Copie as variáveis de ambiente geradas

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, adicione estas variáveis de ambiente:

```env
POSTGRES_URL="sua_url_aqui"
POSTGRES_PRISMA_URL="sua_url_prisma_aqui"
POSTGRES_URL_NON_POOLING="sua_url_non_pooling_aqui"
ADMIN_API_TOKEN="seu_token_secreto_aqui"
```

**IMPORTANTE**: Troque o `ADMIN_API_TOKEN` para algo mais seguro!

### 3. Criar as Tabelas no Banco

Execute no terminal:

```bash
npx prisma db push
```

## Como Usar o Sistema

### Acessar o Painel Admin

1. Acesse: `https://seu-site.com/admin`
2. Use o token configurado em `ADMIN_API_TOKEN`

### Bloquear Datas/Horários

No painel admin você pode:

- **Bloquear dia inteiro**: Ative a opção "Dia inteiro"
- **Bloquear horário específico**: Desative "Dia inteiro" e selecione início/fim
- **Bloquear por serviço**: Escolha Daycare, Hotel, Van ou Todos
- **Adicionar motivo**: Campo opcional para documentar o bloqueio

### Exemplos de Uso

#### Bloquear 4 de julho (dia cheio):
1. Selecione 4 de julho no calendário
2. Ative "Dia inteiro"
3. Serviço: "Todos os Serviços"
4. Motivo: "Capacidade máxima"

#### Bloquear horário de manutenção:
1. Selecione a data
2. Desative "Dia inteiro"
3. Hora Início: 14:00
4. Hora Fim: 16:00
5. Motivo: "Manutenção programada"

## API para Integração

### Consultar Datas Bloqueadas (Público)

```bash
GET /api/blocked-dates?service=daycare
```

### Gerenciar Bloqueios (Requer Token)

```bash
# Listar bloqueios
GET /api/admin/blocked-dates
Authorization: Bearer seu_token_aqui

# Adicionar bloqueio
POST /api/admin/blocked-dates
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "date": "2025-07-04",
  "isFullDay": true,
  "service": null,
  "reason": "Capacidade máxima"
}

# Remover bloqueio
DELETE /api/admin/blocked-dates?id=id_do_bloqueio
Authorization: Bearer seu_token_aqui
```

## Comportamento nos Formulários

Quando uma data/horário está bloqueada:

1. **Datas completamente bloqueadas**: Aparecem desabilitadas no calendário
2. **Horários bloqueados**: Não aparecem nas opções de horário
3. **Bloqueio por serviço**: Afeta apenas o serviço específico

## Solução de Problemas

### Erro "Module not found"
Execute: `npm install`

### Erro de banco de dados
Verifique se as variáveis de ambiente estão corretas e execute: `npx prisma db push`

### Token não funciona
Verifique se o `ADMIN_API_TOKEN` está configurado corretamente no Vercel
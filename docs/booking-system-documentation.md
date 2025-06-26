# Documentação Completa - Sistema de Reservas PinkDog

## Índice
1. [Visão Geral](#visão-geral)
2. [Formulários de Reserva](#formulários-de-reserva)
3. [API Route](#api-route)
4. [Templates de Email](#templates-de-email)
5. [Sistema de Testes](#sistema-de-testes)
6. [Configuração de Ambiente](#configuração-de-ambiente)
7. [Fluxo de Dados](#fluxo-de-dados)

## Visão Geral

O sistema de reservas PinkDog consiste em três formulários principais que enviam dados para uma API centralizada, que por sua vez envia webhooks para o n8n para processar e enviar emails.

### Arquitetura
```
Formulários (React) → API Route (Next.js) → Webhook n8n → Templates Email → Cliente/Loja
```

## Formulários de Reserva

### 1. Pet Hotel Booking Form
**Localização:** `/components/pinkdog/pet-hotel-booking-form.tsx`
**Páginas:** Home, `/pet-hotel`

#### Campos:
- `ownerName`: Nome do proprietário
- `email`: Email do cliente
- `phone`: Telefone
- `petName`: Nome(s) do(s) pet(s)
- `petType`: Tipo do pet (dog/cat)
- `petAge`: Idade do pet
- `numberOfPets`: Número de pets
- `breeds`: Raças
- `checkInDate`: Data de entrada
- `checkInTime`: Horário de entrada
- `checkOutDate`: Data de saída
- `checkOutTime`: Horário de saída
- `specialNotes`: Observações especiais

### 2. Daycare Booking Form
**Localização:** `/components/pinkdog/daycare-booking-form.tsx`
**Página:** `/daycare`

#### Campos:
- `ownerName`: Nome do proprietário
- `email`: Email do cliente
- `phone`: Telefone
- `petName`: Nome do pet
- `petType`: Tipo do pet (dog/cat)
- `breed`: Raça
- `age`: Idade
- `previousExperience`: Experiência prévia (yes/no)
- `socialBehavior`: Comportamento social
- `date`: Data do daycare
- `dropOffTime`: Horário de entrada
- `pickUpTime`: Horário de saída
- `additionalNotes`: Notas adicionais

### 3. Van Service Booking Form
**Localização:** `/components/pinkdog/van-booking-form.tsx`
**Página:** `/van-service`

#### Campos:
- `ownerName`: Nome do proprietário
- `email`: Email do cliente
- `phone`: Telefone
- `petNames`: Nome(s) do(s) pet(s)
- `petType`: Tipo do pet (dog/cat)
- `numberOfPets`: Número de pets
- `breed`: Raça
- `size`: Tamanho (Small/Medium/Large)
- `age`: Idade
- `serviceNeeded`: Tipo de serviço (pickup/dropoff/both)
- `address`: Endereço de coleta/entrega
- `desiredDate`: Data desejada
- `timeWindow`: Janela de horário
- `requestedService`: Serviço solicitado (grooming/daycare/boarding/other)
- `otherServiceType`: Outro tipo de serviço (se other)
- `specialInstructions`: Instruções especiais

## API Route

**Localização:** `/app/api/send-booking-email/route.ts`

### Funcionalidades:
1. **Detecção de Modo de Teste**
   - Automático em desenvolvimento (`NODE_ENV !== 'production'`)
   - Manual via página `/test-forms` (detecta via header `referer`)

2. **Processamento de Dados**
   - Recebe dados dos formulários
   - Mapeia campos para formato esperado pelo n8n
   - Adiciona metadados em modo teste

3. **Redirecionamento de Email (Modo Teste)**
   - Substitui email do cliente por `TEST_EMAIL`
   - Adiciona prefixo `[TESTE]` ao nome
   - Inclui metadados: `_testMode`, `_originalEmail`, `_environment`, `_timestamp`

### Estrutura de Dados Enviada ao n8n:
```json
{
  "clientName": "Nome do Cliente",
  "clientEmail": "email@exemplo.com",
  "clientPhone": "(11) 98765-4321",
  "petName": "Nome do Pet",
  "numberOfPets": "1",
  "petType": "Dog/Cat",
  "petBreed": "Raça",
  "petSize": "pequeno/medio/grande",
  "petAge": "Idade",
  "checkIn": "2024-01-15 09:00",
  "checkOut": "2024-01-17 17:00",
  "services": ["Pet Hotel/Daycare/PinkVan"],
  "observations": "Observações",
  // Campos específicos para Van:
  "serviceType": "grooming/daycare/boarding",
  "serviceNeeded": "pickup/dropoff/both",
  "address": "Endereço completo",
  "specialInstructions": "Instruções especiais"
}
```

## Templates de Email

### Estrutura de Pastas:
```
emails-templates-n8n/
├── daycare/
│   ├── Daycare-Client-FormEmail.html
│   └── DaycareStoreFormEmail.html
├── petHotel/
│   ├── hotel-Client-FormEmail.html
│   └── hotel-store-FormEmail.html
└── pinkVan/
    ├── PinkVanClientFormEmail.html
    └── PinkVan-Store-FormEmail.html
```

### Templates Cliente:
- Design visual atrativo com gradientes rosa
- Logo PinkDog no topo
- Resumo do pedido formatado
- Informações de contato
- Call-to-action para contato

### Templates Loja:
- Design mais técnico/administrativo
- Todos os dados organizados em seções
- Botão de resposta rápida ao cliente
- Instruções de próximos passos
- Alertas importantes (ex: Van service requer confirmação em 24h)

## Sistema de Testes

### Página de Teste
**URL:** `/test-forms`
**Localização:** `/app/(marketing)/test-forms/page.tsx`

### Funcionalidades:
1. **Interface Visual**
   - 3 cards com formulários pré-preenchidos
   - Status de servidor
   - Botão "Send All Tests"
   - Feedback visual de sucesso/erro

2. **Dados de Teste Pré-configurados**
   - Daycare: Golden Retriever com experiência
   - Pet Hotel: Labrador com 4 dias de estadia
   - Van: Pastor Alemão para grooming

3. **Detecção Automática**
   - API detecta origem `/test-forms`
   - Usa `N8N_WEBHOOK_TEST_URL` automaticamente
   - Redireciona emails para `TEST_EMAIL`

## Configuração de Ambiente

### Arquivo `.env.local`:
```bash
# Webhook de Produção
N8N_WEBHOOK_URL=https://tbardini.app.n8n.cloud/webhook/pinkdog-booking

# Webhook de Teste
N8N_WEBHOOK_TEST_URL=https://tbardini.app.n8n.cloud/webhook-test/pinkdog-booking-test

# Email para receber testes
TEST_EMAIL=seu-email-teste@gmail.com
```

### Variáveis de Ambiente:
- `NODE_ENV`: Determina modo (development/production)
- `N8N_WEBHOOK_URL`: URL do webhook de produção
- `N8N_WEBHOOK_TEST_URL`: URL do webhook de teste
- `TEST_EMAIL`: Email para receber testes

## Fluxo de Dados

### Produção:
1. Cliente preenche formulário
2. Dados enviados para `/api/send-booking-email`
3. API envia para `N8N_WEBHOOK_URL`
4. n8n processa e envia emails usando templates
5. Cliente recebe confirmação
6. Loja recebe notificação

### Desenvolvimento/Teste:
1. Desenvolvedor acessa `/test-forms`
2. Clica em "Send Test Email"
3. API detecta origem e ativa modo teste
4. Dados enviados para `N8N_WEBHOOK_TEST_URL`
5. Emails redirecionados para `TEST_EMAIL`
6. Nome com prefixo `[TESTE]`
7. Metadados de teste incluídos

### Logs do Console (Modo Teste):
```
🔧 Mode: TEST/DEVELOPMENT
📍 Environment: development
🧪 Test mode active - Email redirected
📧 Original email: cliente@real.com
✉️ Test email: teste@exemplo.com
🔗 Using test webhook URL
📤 Sending test data: {...}
✅ Test booking sent successfully
```

## Validações e Segurança

### Validações de Formulário:
- Todos os campos obrigatórios validados
- Formato de email verificado
- Datas futuras obrigatórias
- Telefone com mínimo 10 caracteres

### Segurança:
- Webhooks privados não expostos no frontend
- Validação de campos obrigatórios na API
- Fallbacks para valores não especificados
- Sanitização de dados antes do envio

### Fallbacks:
- `TEST_EMAIL` não configurado → usa `teste@exemplo.com`
- `N8N_WEBHOOK_TEST_URL` não configurado → usa webhook produção com aviso
- Campos opcionais não preenchidos → valores padrão apropriados

## Manutenção

### Para adicionar novo campo:
1. Adicionar ao schema do formulário (Zod)
2. Adicionar campo visual no formulário
3. Mapear no `onSubmit` do formulário
4. Processar na API route
5. Adicionar aos templates de email

### Para testar mudanças:
1. Configure `.env.local` com webhooks de teste
2. Acesse `/test-forms`
3. Envie testes individuais ou em lote
4. Verifique logs no console
5. Confirme recebimento no email de teste
6. Verifique dados no n8n

### Troubleshooting:
- **Email não chega**: Verificar webhook URL e logs do n8n
- **Modo teste não ativa**: Verificar header referer e NODE_ENV
- **Campos faltando**: Verificar mapeamento na API route
- **Template quebrado**: Validar sintaxe n8n no template HTML
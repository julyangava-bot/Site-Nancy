# Guia de Teste Completo - Sistema de Formulários PinkDog

## 🔧 Configuração Inicial

### 1. Configure as variáveis de ambiente no `.env.local`:

```bash
# Webhook de Produção (não será usado em desenvolvimento)
N8N_WEBHOOK_URL=https://tbardini.app.n8n.cloud/webhook/pinkdog-booking

# Webhook de Teste - CONFIGURE AQUI O SEU WEBHOOK DE TESTE
N8N_WEBHOOK_TEST_URL=https://tbardini.app.n8n.cloud/webhook-test/SEU-WEBHOOK-TESTE-AQUI

# Email para receber todos os testes
TEST_EMAIL=seu-email-teste@gmail.com
```

### 2. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🧪 Testando os Formulários

### 1. Pet Hotel Booking Form

**Onde testar:** Página inicial ou `/pet-hotel`

**Dados de teste sugeridos:**
```
Nome: João Silva
Email: joao.real@email.com
Telefone: (11) 98765-4321
Pet Name: Max e Luna
Pet Type: Dog
Age: 3 anos
Number of Pets: 2
Breeds: Golden Retriever, Labrador
Check-in: [Selecione uma data futura]
Check-in Time: 09:00
Check-out: [Selecione uma data posterior]
Check-out Time: 17:00
Special Notes: Teste do sistema de pet hotel
```

**O que esperar:**
- Email será enviado para `TEST_EMAIL` ao invés de `joao.real@email.com`
- Nome aparecerá como `[TESTE] João Silva`
- Dados incluirão metadados de teste: `_testMode: true`, `_originalEmail`, etc.

### 2. Daycare Booking Form

**Onde testar:** Página `/daycare`

**Dados de teste sugeridos:**
```
Nome: Maria Santos
Email: maria.real@email.com
Telefone: (21) 91234-5678
Pet Name: Buddy
Pet Type: Cat
Breed: Siamês
Age: 2 anos
Previous Daycare: Yes
Social Behavior: Muito sociável com outros gatos
Date: [Selecione uma data futura]
Drop-off: 08:30
Pick-up: 18:00
Special Notes: Teste do sistema daycare
```

**O que esperar:**
- Email redirecionado para `TEST_EMAIL`
- Nome como `[TESTE] Maria Santos`
- Serviço identificado como `Daycare`

### 3. Van Service Booking Form

**Onde testar:** Página `/van-service`

**Dados de teste sugeridos:**
```
Nome: Pedro Oliveira
Email: pedro.real@email.com
Telefone: (31) 93456-7890
Pet Names: Rex
Pet Type: Dog
Number of Pets: 1
Breed: Pastor Alemão
Size: Large
Age: 5 anos
Service Needed: Both Pick-Up & Drop-Off
Address: Rua Teste, 123 - Bairro Teste
Date: [Selecione uma data futura]
Time Window: 10:00 AM - 12:00 PM
Service Type: Grooming
Special Instructions: Teste do sistema van service
```

**O que esperar:**
- Email redirecionado para `TEST_EMAIL`
- Nome como `[TESTE] Pedro Oliveira`
- Endereço incluído nos dados
- Serviço identificado como `PinkVan`

## 📊 Verificando os Resultados

### No Console do Navegador (F12):

Você verá mensagens como:
```
🔧 Mode: TEST/DEVELOPMENT
📍 Environment: development
🧪 Test mode active - Email redirected
📧 Original email: joao.real@email.com
✉️ Test email: seu-email-teste@gmail.com
🔗 Using test webhook URL
📧 Webhook URL: https://tbardini.app.n8n.cloud/webhook-test/SEU-WEBHOOK-TESTE
✉️ Email destination: TEST EMAIL
📤 Sending test data: {...}
✅ Test booking sent successfully
```

### No N8N:

1. Acesse seu webhook de teste no n8n
2. Verifique o histórico de execuções
3. Você verá os dados recebidos com:
   - `clientName` com prefixo `[TESTE]`
   - `clientEmail` substituído pelo `TEST_EMAIL`
   - Campos adicionais: `_testMode`, `_originalEmail`, `_environment`, `_timestamp`

### Estrutura dos Dados Enviados em Teste:

```json
{
  "clientName": "[TESTE] João Silva",
  "clientEmail": "seu-email-teste@gmail.com",
  "clientPhone": "(11) 98765-4321",
  "petName": "Max e Luna",
  "numberOfPets": "2",
  "petType": "dog",
  "petBreed": "Golden Retriever, Labrador",
  "petSize": "medio",
  "petAge": "3 anos",
  "checkIn": "2024-01-15 09:00",
  "checkOut": "2024-01-17 17:00",
  "services": ["Pet Hotel"],
  "observations": "Teste do sistema de pet hotel\\nCheck-in: 09:00\\nCheck-out: 17:00",
  "_originalEmail": "joao.real@email.com",
  "_testMode": true,
  "_environment": "development",
  "_timestamp": "2024-01-10T15:30:00.000Z"
}
```

## ⚠️ Pontos Importantes

1. **NUNCA commite o arquivo `.env.local`** - ele contém suas chaves privadas
2. **Em produção**, o sistema automaticamente:
   - Usa o webhook de produção
   - Envia emails para os clientes reais
   - Não adiciona prefixo `[TESTE]`
   - Não inclui metadados de teste

3. **Fallbacks de segurança**:
   - Se `TEST_EMAIL` não estiver configurado: usa `teste@exemplo.com`
   - Se `N8N_WEBHOOK_TEST_URL` não estiver configurado: usa webhook de produção
   - Console mostrará avisos para configurações faltantes

## 🚀 Testando Cenários Específicos

### Teste de Validação:
- Tente enviar formulário sem preencher campos obrigatórios
- Tente com emails inválidos
- Tente com datas passadas

### Teste de Diferentes Serviços:
- Pet Hotel: Múltiplos pets, diferentes tipos
- Daycare: Com e sem experiência prévia
- Van: Diferentes tipos de serviço (pick-up only, drop-off only, both)

### Teste de Caracteres Especiais:
- Nomes com acentos: José, María
- Endereços com caracteres especiais
- Notas com quebras de linha

## 📝 Checklist de Teste

- [ ] Configurei `N8N_WEBHOOK_TEST_URL` no `.env.local`
- [ ] Configurei `TEST_EMAIL` no `.env.local`
- [ ] Testei formulário Pet Hotel
- [ ] Testei formulário Daycare
- [ ] Testei formulário Van Service
- [ ] Verifiquei logs no console
- [ ] Verifiquei dados no n8n
- [ ] Confirmei que emails chegaram no `TEST_EMAIL`
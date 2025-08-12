# NestJS Pomodoro API com Supabase

API REST construída com NestJS e Supabase para uma aplicação de Pomodoro, pronta para deployment na Vercel.

## 🚀 Recursos

- **Autenticação JWT** - Login seguro com tokens
- **Gestão de Usuários** - CRUD completo de usuários
- **Gestão de Tarefas** - Sistema de tarefas baseado no formato do JSON Server original
- **Perfis de Pomodoro** - Configurações personalizáveis de tempo
- **Banco de Dados** - PostgreSQL via Supabase
- **Deploy na Vercel** - Configuração otimizada para serverless

## 📋 Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Conta na Vercel

## 🔧 Configuração Local

### 1. Clone e instale dependências
```bash
npm install
```

### 2. Configure o Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Vá para o SQL Editor e execute o script `database.sql`
3. Copie a URL do projeto e a chave anônima

### 3. Configure as variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Execute em desenvolvimento
```bash
npm run start:dev
```

### 5. Acesse a documentação da API
A API possui documentação interativa Swagger disponível em:
```
http://localhost:3000/docs
```

## 🚀 Deploy na Vercel

### 1. Conecte o repositório à Vercel

### 2. Configure as variáveis de ambiente na Vercel
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` 
- `JWT_SECRET`

### 3. Deploy automático
O projeto está configurado para build automático na Vercel.

## 📡 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários (autenticado)
- `GET /users/:id` - Buscar usuário (autenticado)
- `PATCH /users/:id` - Atualizar usuário (autenticado)
- `DELETE /users/:id` - Deletar usuário (autenticado)

### Tarefas
- `GET /tasks` - Buscar tarefas do usuário logado
- `POST /tasks` - Criar container de tarefas
- `PATCH /tasks` - Atualizar tarefas do usuário
- `DELETE /tasks` - Deletar tarefas do usuário

### Perfis
- `GET /profiles` - Buscar perfis do usuário logado
- `POST /profiles` - Criar container de perfis
- `PATCH /profiles` - Atualizar perfis do usuário
- `DELETE /profiles` - Deletar perfis do usuário

## 📊 Estrutura do Banco de Dados

### Tabela: users
```sql
id, name, surname, username, email, password, created_at, updated_at
```

### Tabela: tasks
```sql
id, user_id, taskStored (JSONB), created_at, updated_at
```

### Tabela: profiles
```sql
id, user_id, lastProfile, profileStored (JSONB), created_at, updated_at
```

## 🔒 Autenticação

Todas as rotas exceto criação de usuário e login requerem autenticação via Bearer Token:

```javascript
headers: {
  'Authorization': 'Bearer your-jwt-token'
}
```

## 📝 Exemplo de Uso

### 1. Criar usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dean",
    "surname": "de Meneses", 
    "username": "DeanVini",
    "email": "dean@example.com",
    "password": "dean@12345"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "DeanVini",
    "password": "dean@12345"
  }'
```

### 3. Gerenciar tarefas
```bash
curl -X PATCH http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "taskStored": [
      {
        "description": "Desenvolver o PomodoroVUE",
        "finished": false,
        "show": true,
        "id": 1
      }
    ]
  }'
```

## 🛠️ Scripts Disponíveis

- `npm run start` - Executar em produção
- `npm run start:dev` - Executar em desenvolvimento
- `npm run build` - Build para produção
- `npm run vercel-build` - Build para Vercel
- `npm run prisma:generate` - Gerar cliente Prisma
- `npm run prisma:studio` - Interface visual do banco
- `npm run prisma:seed` - Criar dados iniciais

## 📁 Estrutura do Projeto

```
src/
├── auth/           # Módulo de autenticação
├── users/          # Módulo de usuários
├── tasks/          # Módulo de tarefas
├── profiles/       # Módulo de perfis
├── prisma/         # Configuração do Prisma
├── supabase/       # Configuração do Supabase
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada
```

# Prisma + Supabase Integration

Este projeto agora utiliza **Prisma** como ORM para interagir com o banco de dados PostgreSQL do Supabase, oferecendo uma experiência de desenvolvimento mais robusta com type safety completo.

## 🎯 Vantagens da Integração

### ✅ **Type Safety Completo**
```typescript
// Antes (Supabase client direto)
const { data, error } = await supabase.from('users').select('*')

// Agora (Prisma)
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true
  }
})
```

### ✅ **Relações Automáticas**
```typescript
// Buscar usuário com suas tarefas e perfis
const userWithData = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    tasks: true,
    profiles: true
  }
})
```

### ✅ **Query Builder Intuitivo**
```typescript
// Queries complexas de forma simples
const users = await prisma.user.findMany({
  where: {
    OR: [
      { email: { contains: '@gmail.com' } },
      { username: { startsWith: 'admin' } }
    ]
  },
  orderBy: { createdAt: 'desc' },
  take: 10
})
```

## 🛠️ Schema do Prisma

### Modelos Definidos:
- **User**: Dados do usuário com relações
- **Task**: Container de tarefas (JSON)
- **Profile**: Configurações de Pomodoro (JSON)

### Relações:
- `User` → `Task[]` (one-to-many)
- `User` → `Profile[]` (one-to-many)
- Cascade delete configurado

## 📝 Scripts Disponíveis

```bash
# Gerar cliente Prisma
npm run prisma:generate

# Visualizar dados (Prisma Studio)
npm run prisma:studio

# Migrations (desenvolvimento)
npm run prisma:migrate

# Deploy migrations (produção)
npm run prisma:deploy
```

## 🔧 Configuração

### 1. Database URL
```env
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

### 2. Schema Sync
O schema do Prisma está sincronizado com as tabelas do Supabase criadas pelo script `database.sql`.

### 3. JSON Fields
- `taskStored`: Array de tarefas em formato JSON
- `profileStored`: Array de perfis em formato JSON

## 🚀 Deploy na Vercel

O projeto está configurado para:
1. **Auto-generate**: `postinstall` script gera o cliente automaticamente
2. **Vercel Build**: `vercel-build` inclui `prisma generate`
3. **Database**: Usa a mesma DATABASE_URL do Supabase

## 💡 Exemplo de Uso

```typescript
// Criar usuário com tarefas e perfil padrão
const user = await prisma.user.create({
  data: {
    name: "Dean",
    surname: "de Meneses",
    username: "DeanVini",
    email: "dean@example.com",
    password: hashedPassword,
    tasks: {
      create: {
        taskStored: [
          { description: "Estudar Prisma", finished: false, show: true }
        ]
      }
    },
    profiles: {
      create: {
        lastProfile: 1,
        profileStored: [
          { name: "Default", focusTime: 25, break: 5, longBreak: 15 }
        ]
      }
    }
  },
  include: {
    tasks: true,
    profiles: true
  }
})
```

## 🔄 Migração Híbrida

O projeto mantém **compatibilidade total** com:
- ✅ Supabase Auth (ainda disponível via SupabaseService)
- ✅ Supabase Real-time (caso necessário no futuro)
- ✅ Supabase Storage (caso necessário no futuro)
- ✅ Row Level Security (configurado no database.sql)

**Prisma é usado apenas para**: Operações de banco de dados (CRUD)

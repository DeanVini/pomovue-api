# Instruções de Deploy na Vercel

## 1. Preparação do Projeto

### Configurar Supabase
1. Acesse [Supabase](https://supabase.com) e crie um novo projeto
2. No SQL Editor, execute o script `database.sql` para criar as tabelas
3. Anote a URL do projeto e a chave anônima

### Configurar Variáveis de Ambiente na Vercel
1. Vá para o dashboard do seu projeto na Vercel
2. Acesse Settings > Environment Variables
3. Adicione as seguintes variáveis:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars
NODE_ENV=production
```

## 2. Deploy Automático

O projeto está configurado com:
- `vercel.json` para configuração do deploy
- Scripts otimizados no `package.json`
- Build automático via `vercel-build` script

## 3. Testando a API

Após o deploy, teste os endpoints:

### Criar usuário
```bash
curl -X POST https://your-app.vercel.app/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dean",
    "surname": "de Meneses",
    "username": "DeanVini",
    "email": "dean@example.com",
    "password": "dean@12345"
  }'
```

### Login
```bash
curl -X POST https://your-app.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "DeanVini",
    "password": "dean@12345"
  }'
```

### Acessar tarefas (com token)
```bash
curl -X GET https://your-app.vercel.app/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 4. Estrutura da API

### Endpoints Disponíveis:
- `POST /users` - Criar usuário
- `POST /auth/login` - Login
- `GET|POST|PATCH|DELETE /tasks` - Gerenciar tarefas
- `GET|POST|PATCH|DELETE /profiles` - Gerenciar perfis Pomodoro

O projeto está pronto para produção! 🚀

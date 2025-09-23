# Backend NestJS - Sistema Sotero SOS

> API backend para controle de veículos da rede Sotero desenvolvida com NestJS + Prisma + MariaDB

<img src="https://img.shields.io/badge/NestJS-v11.0.1-red" /> <img src="https://img.shields.**🔄 Prisma Client não funciona:**
```bash
# Regenerar cliente Prisma
npm run prisma:generate
```

** Swagger não aparece:**
```bash
# Verificar se aplicação está rodando
curl http://localhost:3000/health

# Acessar documentação
curl http://localhost:3000/api

# Se não funcionar, verificar logs
npm run start:dev
```

** CORS errors no frontend:**
```bash
# Verificar se CORS está configurado no main.ts
# Adicionar URL do frontend nas origens permitidas
```dge/Prisma-v6.16.2-blue" /> <img src="https://img.shields.io/badge/MariaDB-v10.11-orange" /> <img src="https://img.shields.io/badge/Docker-enabled-blue" />

##  Quick Start

### Opção 1: Docker (Recomendado)
```bash
# Clonar e acessar o projeto
git clone <repository-url>
cd backend_nestjs

# Subir ambiente completo (MariaDB + Backend)
npm run docker:up

# Verificar se está funcionando
curl http://localhost:3000/health
```
 **API disponível em:** `http://localhost:3000`  
 **Documentação Swagger:** `http://localhost:3000/api`

### Opção 2: Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# Gerar cliente Prisma
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Iniciar em modo desenvolvimento
npm run start:dev
```

##  Arquitetura

```
 Backend NestJS
├──  NestJS Framework
├──  Prisma ORM
├──  MariaDB Database
├──  Docker Container
└──  Swagger Documentation
```

### Tecnologias Utilizadas
- **[NestJS](https://nestjs.com/)** - Framework Node.js escalável
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[MariaDB](https://mariadb.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização
- **[Swagger](https://swagger.io/)** - Documentação automática da API

##  Swagger Documentation

A documentação da API é gerada automaticamente e fica disponível em:
```
http://localhost:3000/api
```

### Como usar:
1. ** Inicie o servidor** com `npm run start:dev`
2. ** Acesse** `http://localhost:3000/api` no browser
3. ** Explore** todos os endpoints disponíveis
4. ** Teste** diretamente no navegador usando "Try it out"
5. **📋 Copie** exemplos de request/response para seu frontend

### Benefícios:
-  **Documentação sempre atualizada** (sincronizada com código)
-  **Interface visual** para testar endpoints
-  **Exemplos práticos** de request/response
-  **Validações documentadas** (tipos, campos obrigatórios)
-  **Zero configuração** (funciona automaticamente)

##  API Endpoints

### Setores
```http
GET    /sos/setor           # Lista todos os setores
POST   /sos/setor/create    # Cria novo setor
GET    /sos/setor/:id       # Busca setor por ID
PATCH  /sos/setor/edit/:id  # Atualiza setor
DELETE /sos/setor/:id       # Remove setor
```

### Health Check
```http
GET    /health              # Status da aplicação
```

** Documentação completa:** Acesse `http://localhost:3000/api` após iniciar o servidor

##  Banco de Dados

### Schema Principal
- ** Usuario** - Usuários do sistema (coordenadores, tráfego, operacional)
- ** Setor** - Setores da empresa (manhã, tarde, noite)
- ** Veiculo** - Frota de veículos (caminhões, triciclos)
- ** Motorista** - Motoristas da empresa
- ** Motivo** - Motivos dos chamados SOS
- ** Atendimento** - Registros de atendimentos

### Migrations
```bash
# Aplicar novas migrations
npm run prisma:migrate

# Reset do banco (cuidado!)
npm run prisma:migrate reset

# Visualizar banco de dados
npm run prisma:studio
```

##  Docker

### Comandos Principais
```bash
# Subir containers (produção)
npm run docker:up

# Subir containers (desenvolvimento com hot-reload)
npm run docker:dev:up

# Ver logs dos containers
npm run docker:logs

# Parar containers
npm run docker:down

# Rebuild completo
npm run docker:down && npm run docker:up
```

### Containers
- ** sotero-backend** - Aplicação NestJS (porta 3000)
- ** sotero-mariadb** - Banco MariaDB (porta 3306)

##  Testes

```bash
# Executar todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Testes end-to-end
npm run test:e2e

# Coverage dos testes
npm run test:cov
```

##  Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev         # Servidor em modo watch
npm run start:debug       # Servidor com debug
npm run build             # Build para produção
npm run start:prod        # Executar versão de produção

# Banco de dados
npm run prisma:generate   # Gerar cliente Prisma
npm run prisma:migrate    # Executar migrations
npm run prisma:studio     # Interface visual do banco

# Docker
npm run docker:up         # Subir containers
npm run docker:down       # Parar containers
npm run docker:logs       # Ver logs

# Qualidade de código
npm run lint              # Verificar código
npm run format            # Formatar código
```

##  Configuração

### Variáveis de Ambiente (.env)
```env
# Database
DATABASE_URL="mysql://sotero_user:sotero_pass@localhost:3306/sotero_sos"

# Application
NODE_ENV=development
PORT=3000

# Security
JWT_SECRET=your_jwt_secret_here
```

### Pré-requisitos
- **Node.js** 18+ 
- **Docker** e **Docker Compose**
- **Git**

##  Troubleshooting

###  Problemas Comuns

** Docker não sobe:**
```bash
# Verificar se Docker está rodando
docker --version

# Limpar containers antigos
docker system prune -a
```

** Erro de conexão com banco:**
```bash
# Verificar se MariaDB está rodando
docker ps | grep mariadb

# Resetar banco de dados
npm run prisma:migrate reset
```

** Erro de dependências:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

** Prisma Client não funciona:**
```bash
# Regenerar cliente Prisma
npm run prisma:generate
```

###  Suporte
- **Documentação:** Consulte este README
- **Issues:** Criar issue no repositório
- **Logs:** `npm run docker:logs` para verificar erros

##  Estrutura do Projeto

```
backend_nestjs/
├── src/
│   ├── app.module.ts          # Módulo principal
│   ├── main.ts               # Arquivo de entrada
│   ├── setor/                # Módulo de setores
│   │   ├── setor.controller.ts
│   │   ├── setor.service.ts
│   │   ├── setor.module.ts
│   │   └── dto/
│   └── common/               # Interfaces e utilitários
├── prisma/
│   └── schema.prisma         # Schema do banco
├── docker-compose.yml        # Container de produção
├── docker-compose.dev.yml    # Container dedesenvolvimento
├── Dockerfile               # Imagem de produção
└── Dockerfile.dev          # Imagem de desenvolvimento
```

##  Deploy

### Desenvolvimento
```bash
npm run docker:dev:up
```

### Produção
```bash
npm run docker:up
```

---

** Dica:** Para ambiente de produção, certifique-se de alterar as variáveis de ambiente em `.env` com valores seguros.

** Status:** Backend em desenvolvimento ativo. Novas funcionalidades sendo adicionadas regularmente.

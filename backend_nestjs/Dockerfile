# Dockerfile para Backend NestJS - Sotero SOS
# Multi-stage build para otimizar o tamanho da imagem

# Estágio 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Estágio 2: Imagem de produção
FROM node:18-alpine AS production

WORKDIR /app

# Instalar dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copiar arquivos necessários do builder
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --chown=nestjs:nodejs package*.json ./

# Mudar para usuário não-root
USER nestjs

# porta
EXPOSE 3000

# Configurar variáveis de ambiente
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Comando de inicialização
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]

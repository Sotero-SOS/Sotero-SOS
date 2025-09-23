import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';

/**
 * Service responsável pela conexão e gerenciamento do Prisma Client
 * Implementa o padrão Singleton para a conexão com MariaDB
 * 
 * @description Este service:
 * - Conecta automaticamente quando o módulo é inicializado
 * - Desconecta quando o módulo é destruído
 * - Fornece acesso a todas as operações do banco via Prisma
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  /**
   * Conecta com o banco MariaDB quando o módulo NestJS é inicializado
   */
  async onModuleInit() {
    console.log('🔌 Conectando com MariaDB...');
    await this.$connect();
    console.log('✅ Conectado com sucesso ao banco sotero_db');
  }

  /**
   * Desconecta do banco quando o módulo é destruído (graceful shutdown)
   */
  async onModuleDestroy() {
    console.log('🔌 Desconectando do MariaDB...');
    await this.$disconnect();
    console.log('✅ Desconectado com sucesso');
  }
}
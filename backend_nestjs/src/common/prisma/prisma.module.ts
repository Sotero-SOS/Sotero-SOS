import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Módulo global do Prisma
 * 
 * @description
 * - Disponibiliza o PrismaService para toda a aplicação
 * - Marcado como @Global() para não precisar importar em cada módulo
 * - Centraliza a conexão com o banco MariaDB
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
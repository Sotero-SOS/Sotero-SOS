import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './common/prisma/prisma.module';
import { MotoristaModule } from './motorista/motorista.module';

@Module({
  imports: [PrismaModule, SetorModule, MotoristaModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}

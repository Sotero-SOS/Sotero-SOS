import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, SetorModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}

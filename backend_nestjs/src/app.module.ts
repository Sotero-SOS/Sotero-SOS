import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [SetorModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}

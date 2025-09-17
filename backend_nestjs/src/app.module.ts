import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetorModule } from './setor/setor.module';

@Module({
  imports: [SetorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

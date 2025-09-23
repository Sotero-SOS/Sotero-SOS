import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Sotero-SOS API')
    .setDescription('API para controle de veículos da rede Sotero')
    .setVersion('1.0')
    .addTag('setores', 'Operações relacionadas aos setores da empresa')
    .addTag('health', 'Status e monitoramento da aplicação')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Documentação Swagger: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();

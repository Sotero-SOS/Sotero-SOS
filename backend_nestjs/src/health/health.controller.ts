import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  
  @Get()
  @ApiOperation({ 
    summary: 'Verifica status da aplicação',
    description: 'Endpoint para monitoramento da saúde da aplicação. Retorna status, timestamp e informações do ambiente.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Aplicação funcionando normalmente',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2024-01-20T10:30:00.000Z',
        environment: 'development',
        database: 'connected'
      }
    }
  })
  checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'connected' // Aqui poderia ter uma verificação real do banco
    };
  }
}

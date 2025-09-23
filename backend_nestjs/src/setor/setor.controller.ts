import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { SetorService } from './setor.service';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';

@ApiTags('setores')
@Controller('setores')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo setor',
    description: 'Cria um novo setor da empresa com nome e turno especificados.'
  })
  @ApiBody({ 
    type: CreateSetorDto,
    description: 'Dados do novo setor',
    examples: {
      exemplo1: {
        summary: 'Setor Operações Manhã',
        value: {
          nome_setor: 'Operações Manhã',
          turno: 'manha'
        }
      },
      exemplo2: {
        summary: 'Setor Administrativo',
        value: {
          nome_setor: 'Administrativo',
          turno: 'tarde'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Setor criado com sucesso',
    schema: {
      example: {
        id: 1,
        nome_setor: 'Operações Manhã',
        turno: 'manha'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  createSetor(@Body() createSetorDto: CreateSetorDto) {
    return this.setorService.createSetor(createSetorDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os setores',
    description: 'Retorna lista completa de todos os setores cadastrados no sistema.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de setores retornada com sucesso',
    schema: {
      example: [
        {
          id: 1,
          nome_setor: 'Operações Manhã',
          turno: 'manha'
        },
        {
          id: 2,
          nome_setor: 'Operações Tarde', 
          turno: 'tarde'
        }
      ]
    }
  })
  getAllSetores() {
    return this.setorService.getAllSetores();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar setor por ID',
    description: 'Retorna um setor específico baseado no ID fornecido.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do setor',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Setor encontrado',
    schema: {
      example: {
        id: 1,
        nome_setor: 'Operações Manhã',
        turno: 'manha'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Setor não encontrado' })
  getSetorById(@Param('id') setorId: string) {
    return this.setorService.getSetorById(+setorId);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Atualizar setor',
    description: 'Atualiza dados de um setor existente baseado no ID fornecido.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do setor a ser atualizado',
    example: 1
  })
  @ApiBody({ 
    type: UpdateSetorDto,
    description: 'Dados para atualização (campos opcionais)',
    examples: {
      exemplo1: {
        summary: 'Alterar apenas nome',
        value: {
          nome_setor: 'Operações Noturnas'
        }
      },
      exemplo2: {
        summary: 'Alterar nome e turno',
        value: {
          nome_setor: 'Administrativo Noite',
          turno: 'noite'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Setor atualizado com sucesso',
    schema: {
      example: {
        id: 1,
        nome_setor: 'Operações Noturnas',
        turno: 'noite'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Setor não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  updateSetor(@Param('id') setorId: string, @Body() updateSetorDto: UpdateSetorDto) {
    return this.setorService.updateSetor(+setorId, updateSetorDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Remover setor',
    description: 'Remove um setor do sistema baseado no ID fornecido. Esta ação é irreversível.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID único do setor a ser removido',
    example: 1
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Setor removido com sucesso',
    schema: {
      example: {
        message: 'Setor removido com sucesso',
        id: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Setor não encontrado' })
  removeSetor(@Param('id') setorId: string) {
    return this.setorService.removeSetor(+setorId);
  }
}
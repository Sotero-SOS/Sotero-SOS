import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('motorista')
@Controller('motorista')
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo motorista' })
  @ApiBody({ type: CreateMotoristaDto })
  @ApiResponse({ status: 201, description: 'Motorista criado com sucesso.' })
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristaService.createMotorista(createMotoristaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os motoristas' })
  @ApiResponse({ status: 200, description: 'Lista de motoristas.' })
  findAll() {
    return this.motoristaService.getAllMotoristas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca motorista por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Motorista encontrado.' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.motoristaService.getMotoristaById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza motorista' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMotoristaDto })
  @ApiResponse({ status: 200, description: 'Motorista atualizado.' })
  update(@Param('id') id: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristaService.updateMotorista(+id, updateMotoristaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove motorista' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Motorista removido.' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
  remove(@Param('id') id: string) {
    return this.motoristaService.removeMotorista(+id);
  }
}

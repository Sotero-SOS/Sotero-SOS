import { ApiProperty } from '@nestjs/swagger';

export class CreateMotoristaDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do motorista' })
  nome: string;

  @ApiProperty({ example: 2, description: 'ID do setor ao qual o motorista pertence', required: false })
  setor_id?: number;
}

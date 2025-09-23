import { ApiProperty } from '@nestjs/swagger';

export class CreateSetorDto {
  @ApiProperty({
    description: 'Nome do setor da empresa',
    example: 'Operações Manhã',
    type: String,
    minLength: 3,
    maxLength: 100
  })
  nome_setor: string;

  @ApiProperty({
    description: 'Turno de trabalho do setor',
    example: 'manha',
    enum: ['manha', 'tarde', 'noite', 'madrugada'],
    required: false
  })
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}
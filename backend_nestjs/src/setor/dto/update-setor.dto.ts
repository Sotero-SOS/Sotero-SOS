import { ApiProperty } from '@nestjs/swagger';

export class UpdateSetorDto {
  @ApiProperty({
    description: 'Nome do setor da empresa',
    example: 'Operações Noturnas',
    type: String,
    minLength: 3,
    maxLength: 100,
    required: false
  })
  nome_setor?: string;

  @ApiProperty({
    description: 'Turno de trabalho do setor',
    example: 'noite',
    enum: ['manha', 'tarde', 'noite', 'madrugada'],
    required: false
  })
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}
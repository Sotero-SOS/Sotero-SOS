import { ApiProperty } from '@nestjs/swagger';

export class SetorResponseDto {
  @ApiProperty({
    description: 'ID único do setor',
    example: 1,
    type: Number
  })
  id: number;

  @ApiProperty({
    description: 'Nome do setor da empresa',
    example: 'Operações Manhã',
    type: String
  })
  nome_setor: string;

  @ApiProperty({
    description: 'Turno de trabalho do setor',
    example: 'manha',
    enum: ['manha', 'tarde', 'noite', 'madrugada'],
    nullable: true
  })
  turno: 'manha' | 'tarde' | 'noite' | 'madrugada' | null;
}

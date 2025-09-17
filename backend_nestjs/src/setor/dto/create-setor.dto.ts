export class CreateSetorDto {
  nome_setor: string;
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}
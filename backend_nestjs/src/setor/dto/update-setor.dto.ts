import { CreateSetorDto } from './create-setor.dto';

export class UpdateSetorDto {
  nome_setor?: string;
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}
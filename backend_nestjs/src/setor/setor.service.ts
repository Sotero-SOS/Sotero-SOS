import { Injectable } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

// Interface que define a estrutura de um Setor
// Baseada no modelo do banco PostgreSQL que será implementado
export interface Setor {
  id: number;
  nome_setor: string;
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}

// Service responsável pela lógica de negócio dos Setores
// Atualmente usa dados mock para desenvolvimento
// Será migrado para Prisma + PostgreSQL quando o banco estiver configurado
@Injectable()
export class SetorService {

  // Cria um novo setor
  async create(createSetorDto: CreateSetorDto): Promise<ApiResponse<Setor>> {
    // Substituir por this.prisma.setor.create() quando banco estiver pronto
    const novoSetor: Setor = {
        id: Date.now(), // ID temporário - será auto-increment do PostgreSQL
        ...createSetorDto
    };
    
    return {
      data: novoSetor,
      message: 'Setor criado com sucesso'
    };
  }

  // Busca todos os setores cadastrados
  async findAll(): Promise<ApiResponse<Setor[]>> {
    // Substituir por this.prisma.setor.findMany() quando banco estiver pronto
    const setores: Setor[] = [
      { id: 1, nome_setor: 'Operações', turno: 'manha' },
      { id: 2, nome_setor: 'Operações', turno: 'tarde' },
      { id: 3, nome_setor: 'Operações', turno: 'noite' }
    ];

    return {
      data: setores,
      message: 'Setores encontrados com sucesso'
    };
  }

  async findOne(id: number) {
    
  }

  async update(id: number, updateSetorDto: UpdateSetorDto) {
    
  }

  async remove(id: number) {
    
  }
}
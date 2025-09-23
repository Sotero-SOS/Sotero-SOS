import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { PrismaService } from '../common/prisma/prisma.service';

// Interface que define a estrutura de um Setor
// Baseada no modelo do banco MariaDB via Prisma
export interface Setor {
  id: number;
  nome_setor: string;
  turno?: 'manha' | 'tarde' | 'noite' | 'madrugada';
}

// Service responsável pela lógica de negócio dos Setores
// Agora conectado com MariaDB via Prisma
@Injectable()
export class SetorService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo setor no sistema
  async createSetor(createSetorDto: CreateSetorDto): Promise<ApiResponse<Setor>> {
    try {
      const setorPrisma = await this.prisma.setor.create({ 
        data: createSetorDto 
      });
      
      // Converte o retorno do Prisma para nossa interface
      const novoSetor: Setor = {
        id: setorPrisma.id,
        nome_setor: setorPrisma.nome_setor,
        turno: setorPrisma.turno || undefined  // Converte null para undefined
      };
      
      return {
        data: novoSetor,
        message: 'Setor criado com sucesso'
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Setor já existe', HttpStatus.CONFLICT);
      }
      throw new HttpException('Erro ao criar setor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Busca todos os setores cadastrados no sistema
  async getAllSetores(): Promise<ApiResponse<Setor[]>> {
    try {
      const setoresPrisma = await this.prisma.setor.findMany({
        orderBy: {
          nome_setor: 'asc'  // Ordena por nome do setor
        }
      });
      
      // Converte o retorno do Prisma para nossa interface
      const setores: Setor[] = setoresPrisma.map(setorPrisma => ({
        id: setorPrisma.id,
        nome_setor: setorPrisma.nome_setor,
        turno: setorPrisma.turno || undefined  // Converte null para undefined
      }));

      return {
        data: setores,
        message: `${setores.length} setores encontrados com sucesso`
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar setores', 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Busca um setor específico pelo ID
  async getSetorById(setorId: number): Promise<ApiResponse<Setor | null>> {
    // Substituir por this.prisma.setor.findUnique() quando banco estiver pronto
    const setores: Setor[] = [
      { id: 1, nome_setor: 'Operações', turno: 'manha' },
      { id: 2, nome_setor: 'Operações', turno: 'tarde' },
      { id: 3, nome_setor: 'Operações', turno: 'noite' }
    ];

    const setor = setores.find(s => s.id === setorId);

    return {
      data: setor || null,
      message: setor ? 'Setor encontrado com sucesso' : 'Setor não encontrado'
    };
  }

  // Atualiza dados de um setor existente
  async updateSetor(setorId: number, updateSetorDto: UpdateSetorDto): Promise<ApiResponse<Setor | null>> {
    // Substituir por this.prisma.setor.update() quando banco estiver pronto
    const setorExistente = { id: setorId, nome_setor: 'Operações', turno: 'manha' as const };
    
    const setorAtualizado: Setor = {
      ...setorExistente,
      ...updateSetorDto
    };

    return {
      data: setorAtualizado,
      message: 'Setor atualizado com sucesso'
    };
  }

  // Remove um setor do sistema
  async removeSetor(setorId: number): Promise<ApiResponse<{ id: number }>> {
    // Substituir por this.prisma.setor.delete() quando banco estiver pronto
    return {
      data: { id: setorId },
      message: 'Setor removido com sucesso'
    };
  }
}
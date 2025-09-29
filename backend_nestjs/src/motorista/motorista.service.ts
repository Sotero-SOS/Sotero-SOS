import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristaService {
  constructor(private prisma: PrismaService) {}

  // Cria um novo motorista
  async createMotorista(createMotoristaDto: CreateMotoristaDto) {
    try {
      // Validação do setor
      if (createMotoristaDto.setor_id) {
        const setor = await this.prisma.setor.findUnique({
          where: { id: createMotoristaDto.setor_id }
        });
        if (!setor) {
          throw new HttpException('Setor não encontrado', HttpStatus.BAD_REQUEST);
        }
      }

      // Criação do motorista
      const motorista = await this.prisma.motorista.create({
        data: {
          nome: createMotoristaDto.nome,
          setor_id: createMotoristaDto.setor_id,
        },
        include: { setor: true },
      });

      return motorista;
    } catch (error) {
      console.error('Erro detalhado ao criar motorista:', error);
      throw new HttpException('Erro ao criar motorista', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Busca todos os motoristas
   async getAllMotoristas() {
  try {
    return await this.prisma.motorista.findMany({ include: { setor: true } });
  } catch (error) {
    throw new HttpException('Erro ao buscar motoristas', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  // Busca motorista por ID
  async getMotoristaById(id: number) {
    try {
      const motorista = await this.prisma.motorista.findUnique({
        where: { matricula: id },
        include: { setor: true }
      });
      if (!motorista){
        throw new HttpException('Motorista não encontrado', HttpStatus.NOT_FOUND);
      }
      return motorista;
    } catch (error) {
      throw new HttpException('Erro ao buscar motorista', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Atualiza motorista
  async updateMotorista(id: number, updateMotoristaDto: UpdateMotoristaDto) {
    try {
      // Verifica se o motorista existe
      const motorista = await this.prisma.motorista.findUnique({
        where: { matricula: id }
      });
      if (!motorista) {
        throw new HttpException('Motorista não encontrado', HttpStatus.NOT_FOUND);
      }

      // Valida setor se informado
      if (updateMotoristaDto.setor_id) {
        const setor = await this.prisma.setor.findUnique({
          where: { id: updateMotoristaDto.setor_id }
        });
        if (!setor) {
          throw new HttpException('Setor não encontrado', HttpStatus.BAD_REQUEST);
        }
      }

      // Atualiza motorista
      const motoristaAtualizado = await this.prisma.motorista.update({
        where: { matricula: id },
        data: updateMotoristaDto,
        include: { setor: true }
      });
      return motoristaAtualizado;
    } catch (error) {
      throw new HttpException('Erro ao atualizar motorista', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Remove motorista
  async removeMotorista(id: number) {
    try {
      // Verifica se o motorista existe
      const motorista = await this.prisma.motorista.findUnique({
        where: { matricula: id }
      });
      if (!motorista) {
        throw new HttpException('Motorista não encontrado', HttpStatus.NOT_FOUND);
      }

      // Remove motorista
      await this.prisma.motorista.delete({
        where: { matricula: id }
      });
      return { message: 'Motorista removido com sucesso.' };
    } catch (error) {
      throw new HttpException('Erro ao remover motorista', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

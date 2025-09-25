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
    return `This action updates a #${id} motorista`;
  }

  // Remove motorista
  removeMotorista(id: number) {
    return `This action removes a #${id} motorista`;
  }
}

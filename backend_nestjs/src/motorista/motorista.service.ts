import { Injectable } from '@nestjs/common';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristaService {
  create(createMotoristaDto: CreateMotoristaDto) {
    return 'This action adds a new motorista';
  }

  createMotorista(createMotoristaDto: CreateMotoristaDto) {
    return `This action returns all motorista`;
  }

  getAllMotoristas() {
    return `This action returns all motoristas`;
  }

  getMotoristaById(id: number) {
    return `This action returns a #${id} motorista`;
  }

  updateMotorista(id: number, updateMotoristaDto: UpdateMotoristaDto) {
    return `This action updates a #${id} motorista`;
  }

  removeMotorista(id: number) {
    return `This action removes a #${id} motorista`;
  }
}

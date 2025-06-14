import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id_cliente: id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(
    id: string,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    console.log('Atualizando cliente com ID:', id);
    const cliente = await this.clienteRepository.findOne({
      where: { id_cliente: id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }
  async remove(id: string) {
    const cliente = await this.findOne(id);
    return this.clienteRepository.remove(cliente);
  }
}

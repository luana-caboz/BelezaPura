import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Agendamento, StatusAgendamento } from './entities/agendamento.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(dto: CreateAgendamentoDto) {
    console.log('Dto:', dto);
    const cliente = await this.clienteRepository.findOne({ where: {id_cliente: dto.id_cliente}});
    console.log('cliente:', cliente)

    const profissional = await this.usuarioRepository.findOne({ where: { id_profissional: dto.id_profissional } });
    console.log('profissional:', profissional)

    if (!cliente || !profissional) {
      throw new NotFoundException('Cliente ou profissional não encontrado');
    }

    const agendamento = this.agendamentoRepository.create({
      ...dto,
      cliente,
      profissional,
      status: StatusAgendamento.PENDENTE,
    });

    return this.agendamentoRepository.save(agendamento);
  }

  async findAll() {
    return this.agendamentoRepository.find({
      relations: ['cliente', 'profissional'],
      order: { data_hora: 'ASC'}
    });
  }

  async findOne(id: string) {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id_agendamento: id },
      relations: ['cliente', 'profissional'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return agendamento;
  }

  async update(id: string, dto: UpdateAgendamentoDto) {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id_agendamento: id },
      relations: ['profissional'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (dto.status && !Object.values(StatusAgendamento).includes(dto.status)) {
      throw new BadRequestException('Status inválido');
    }
    

    Object.assign(agendamento, dto);
    return this.agendamentoRepository.save(agendamento);
  }
}

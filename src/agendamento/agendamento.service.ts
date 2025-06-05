import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
<<<<<<< Updated upstream
    const cliente = await this.clienteRepository.findOne({
      where: { id_cliente: dto.id_cliente },
    });
=======
    console.log('Dto:', dto);
    const cliente = await this.clienteRepository.findOne({
      where: { id_cliente: dto.id_cliente },
    });
    console.log('cliente:', cliente);
>>>>>>> Stashed changes

    const profissional = await this.usuarioRepository.findOne({
      where: { id_profissional: dto.id_profissional },
    });
<<<<<<< Updated upstream
=======
    console.log('profissional:', profissional);
>>>>>>> Stashed changes

    if (!cliente || !profissional) {
      throw new NotFoundException('Cliente ou profissional não encontrado');
    }

<<<<<<< Updated upstream
    const dataHora = new Date(dto.data_hora);

    const conflito = await this.agendamentoRepository.findOne({
      where: {
        profissional: { id_profissional: dto.id_profissional },
        data_hora: dataHora,
      },
    });
    if (conflito) {
      throw new BadRequestException(
        'Já existe um agendamento para este profissional neste horário',
      );
    }
=======
>>>>>>> Stashed changes
    const agendamento = this.agendamentoRepository.create({
      ...dto,
      cliente,
      profissional,
      status: StatusAgendamento.PENDENTE,
<<<<<<< Updated upstream
      data_hora: dataHora,
=======
>>>>>>> Stashed changes
    });

    return this.agendamentoRepository.save(agendamento);
  }

  async findAll() {
    await this.atualizarAgendamentosConcluidos();

    return this.agendamentoRepository.find({
      relations: ['cliente', 'profissional'],
      order: { data_hora: 'ASC' },
    });
  }

  async findOne(id: string) {
    await this.atualizarAgendamentosConcluidos();

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

  async atualizarAgendamentosConcluidos() {
    const agora = new Date();

    const vencidos = await this.agendamentoRepository.find({
      where: {
        status: StatusAgendamento.PENDENTE,
      },
    });

    const atualizacoes = vencidos
      .filter((a) => new Date(a.data_hora) < agora)
      .map((a) => {
        a.status = StatusAgendamento.CONCLUIDO;
        return this.agendamentoRepository.save(a);
      });

    await Promise.all(atualizacoes);
  }
}

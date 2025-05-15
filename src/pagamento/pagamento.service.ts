import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pagamento } from './entities/pagamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceiroService } from 'src/financeiro/financeiro.service';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    private readonly financeiroService: FinanceiroService,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const { id_agendamento } = createPagamentoDto;

    if (id_agendamento) {
      const pagamentoExistente = await this.pagamentoRepository.findOne({
        where: { id_agendamento },
      });
      console.log('Pagamento já existente?', pagamentoExistente);
      if (pagamentoExistente) {
        throw new BadRequestException(
          `Pagamento já existe para o agendamento ${id_agendamento}`,
        );
      }
    }
    const novoPagamento = this.pagamentoRepository.create(createPagamentoDto);
    console.log('Novo Pagamento:', novoPagamento);

    try {
      const pagamentoSalvo = await this.pagamentoRepository.save(novoPagamento);
      console.log('Criando movimentação financeira');
      await this.financeiroService.criarMovimentacao({
        descricao: `Pagamento do agendamento ${pagamentoSalvo.id_agendamento}`,
        tipo_pagamento: pagamentoSalvo.tipo_pagamento,
        preco: pagamentoSalvo.valor_pago,
        status: 'concluido',
        categoria: 'entrada',
        id_agendamento: pagamentoSalvo.id_agendamento,
      });
      return pagamentoSalvo;
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);

      if (error.code === '23505' && error.detail?.includes('id_agendamento')) {
        throw error;
      }
    }
  }

  async findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find();
  }

  async findOne(id: string): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { id_pagamento: id },
    });
    if (!pagamento) throw new NotFoundException('Pagamento não encontrado');
    return pagamento;
  }

  async update(
    id: string,
    updatePagamentoDto: UpdatePagamentoDto,
  ): Promise<Pagamento> {
    const pagamento = await this.findOne(id);
    Object.assign(pagamento, updatePagamentoDto);
    return this.pagamentoRepository.save(pagamento);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pagamentoRepository.delete(id);
    return result.affected > 0;
  }
}

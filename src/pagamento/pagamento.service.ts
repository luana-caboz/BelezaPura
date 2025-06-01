import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pagamento } from './entities/pagamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const novoPagamento = this.pagamentoRepository.create(createPagamentoDto);
    return this.pagamentoRepository.save(novoPagamento);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarFinanceiroDto } from './dto/create-financeiro.dto';
import { Financeiro } from './entities/financeiro.entity';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  async criarMovimentacao(dto: CriarFinanceiroDto): Promise<Financeiro> {
    const financeiro = this.financeiroRepository.create(dto);
    return this.financeiroRepository.save(financeiro);
  }

  async listarMovimentacoes(): Promise<Financeiro[]> {
    return this.financeiroRepository.find();
  }

  async gerarRelatorioFinanceiro(): Promise<{ totalEntrada: number, totalSaida: number }> {
    const entradas = await this.financeiroRepository
      .createQueryBuilder('financeiro')
      .where('financeiro.categoria = :categoria', { categoria: 'entrada' })
      .select('SUM(financeiro.preco)', 'totalEntrada')
      .getRawOne();

    const saidas = await this.financeiroRepository
      .createQueryBuilder('financeiro')
      .where('financeiro.categoria = :categoria', { categoria: 'saida' })
      .select('SUM(financeiro.preco)', 'totalSaida')
      .getRawOne();

    return {
      totalEntrada: entradas?.totalEntrada || 0,
      totalSaida: saidas?.totalSaida || 0,
    };
  }
}

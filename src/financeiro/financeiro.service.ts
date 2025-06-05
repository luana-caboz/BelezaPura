import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarFinanceiroDto } from './dto/create-financeiro.dto';
import { Financeiro } from './entities/financeiro.entity';
import { UpdateFinanceiroDto } from 'src/financeiro/dto/update-financeiro.dto';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  async criarMovimentacao(dto: CriarFinanceiroDto): Promise<Financeiro> {
    dto.categoria = dto.categoria
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
    const financeiro = this.financeiroRepository.create(dto);
    return this.financeiroRepository.save(financeiro);
  }

  async findOne(id: string): Promise<Financeiro> {
    const usuario = await this.financeiroRepository.findOne({
      where: { id_financeiro: id },
    });
    if (!usuario) throw new NotFoundException('Registro não encontrado');
    return usuario;
  }

  async listarMovimentacoes(): Promise<Financeiro[]> {
    return this.financeiroRepository.find();
  }

  async gerarRelatorioFinanceiro(): Promise<{
    totalEntrada: number;
    totalSaida: number;
  }> {
    const entradasRaw = await this.financeiroRepository
      .createQueryBuilder('f')
      .select('SUM(f.preco)', 'total')
      .where('f.categoria = :categoria', { categoria: 'entrada' })
      .getRawOne();

    const saidasRaw = await this.financeiroRepository
      .createQueryBuilder('f')
      .select('SUM(f.preco)', 'total')
      .where('f.categoria = :categoria', { categoria: 'saida' })
      .getRawOne();

    const entrada = parseFloat(entradasRaw?.total ?? '0');
    const saida = parseFloat(saidasRaw?.total ?? '0');

    return {
      totalEntrada: entrada,
      totalSaida: saida,
    };
  }

  async gerarRelatorioPorPeriodo(
    inicio: Date,
    fim: Date,
  ): Promise<{ totalEntrada: number; totalSaida: number }> {
    const entradas = await this.financeiroRepository
      .createQueryBuilder('f')
      .where(
        'f.categoria = :categoria AND f.data_criacao BETWEEN :inicio AND :fim',
        {
          categoria: 'entrada',
          inicio,
          fim,
        },
      )
      .select('SUM(f.preco)', 'totalEntrada')
      .getRawOne();

    const saidas = await this.financeiroRepository
      .createQueryBuilder('f')
      .where(
        'f.categoria = :categoria AND f.data_criacao BETWEEN :inicio AND :fim',
        {
          categoria: 'saida',
          inicio,
          fim,
        },
      )
      .select('SUM(f.preco)', 'totalSaida')
      .getRawOne();

    return {
      totalEntrada: Number(entradas?.totalEntrada) || 0,
      totalSaida: Number(saidas?.totalSaida) || 0,
    };
  }

  async update(
    id: string,
    updateFinanceiroDto: UpdateFinanceiroDto,
  ): Promise<Financeiro> {
    const financeiro = await this.findOne(id);
    Object.assign(financeiro, updateFinanceiroDto);
    return this.financeiroRepository.save(financeiro);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.financeiroRepository.delete(id);
    return result.affected > 0;
  }
}

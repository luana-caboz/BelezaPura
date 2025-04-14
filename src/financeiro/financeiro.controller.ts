import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarFinanceiroDto } from './dto/create-financeiro.dto';
import { FinanceiroService } from './financeiro.service';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Post()
  async criarMovimentacao(@Body() dto: CriarFinanceiroDto) {
    return this.financeiroService.criarMovimentacao(dto);
  }

  @Get()
  async listarMovimentacoes() {
    return this.financeiroService.listarMovimentacoes();
  }

  @Get('relatorio')
  async gerarRelatorio() {
    return this.financeiroService.gerarRelatorioFinanceiro();
  }
}

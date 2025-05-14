import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CriarFinanceiroDto } from './dto/create-financeiro.dto';
import { FinanceiroService } from './financeiro.service';
import { UpdateFinanceiroDto } from 'src/financeiro/dto/update-financeiro.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdateFinanceiroDto,
  ) {
    return this.financeiroService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.financeiroService.delete(id);
  }
}

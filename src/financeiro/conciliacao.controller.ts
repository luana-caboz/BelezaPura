import { Controller, Get } from '@nestjs/common';
import { ConciliacaoService } from './conciliacao.service';

@Controller('conciliacao')
export class ConciliacaoController {
  constructor(private readonly conciliacaoService: ConciliacaoService) {}

  @Get('conciliar')
  async conciliar() {
    const relatorio = await this.conciliacaoService.conciliarPagamentos();
    return relatorio;
  }
}

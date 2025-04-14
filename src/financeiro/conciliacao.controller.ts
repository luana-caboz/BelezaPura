import { Controller, Get } from '@nestjs/common';
import { ConciliaçãoService } from './conciliacao.service';

@Controller('conciliacao')
export class ConciliaçãoController {
  constructor(private readonly conciliacaoService: ConciliaçãoService) {}

  @Get('conciliar')
  async conciliar() {
    const relatorio = await this.conciliacaoService.conciliarPagamentos();
    return relatorio;
  }
}

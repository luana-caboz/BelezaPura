import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';

@Module({
  providers: [PagamentoService],
  controllers: [PagamentoController]
})
export class PagamentoModule {}

import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';

@Module({
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}

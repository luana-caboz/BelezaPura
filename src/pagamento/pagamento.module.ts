import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceiroModule } from 'src/financeiro/financeiro.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento]), FinanceiroModule],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}

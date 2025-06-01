import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from 'src/agendamento/entities/agendamento.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Financeiro } from './entities/financeiro.entity';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';
import { ConciliacaoService } from 'src/financeiro/conciliacao.service';
import { ConciliacaoController } from 'src/financeiro/conciliacao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Agendamento, Financeiro])],
  controllers: [FinanceiroController, ConciliacaoController],
  providers: [FinanceiroService, ConciliacaoService],
})
export class FinanceiroModule {}

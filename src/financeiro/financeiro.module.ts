import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamento } from 'src/agendamento/entities/agendamento.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { ConciliaçãoController } from './conciliacao.controller';
import { ConciliaçãoService } from './conciliacao.service';
import { Financeiro } from './entities/financeiro.entity';
import { FinanceiroController } from './financeiro.controller';
import { FinanceiroService } from './financeiro.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Agendamento,Financeiro])],
  controllers: [FinanceiroController, ConciliaçãoController],
  providers: [FinanceiroService, ConciliaçãoService],
})
export class FinanceiroModule {}

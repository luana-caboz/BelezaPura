import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento, StatusAgendamento } from 'src/agendamento/entities/agendamento.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Repository } from 'typeorm';
import { Financeiro } from './entities/financeiro.entity';

@Injectable()
export class ConciliaçãoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  async conciliarPagamentos(): Promise<string> {
    const agendamentosConcluidos = await this.agendamentoRepository.find({
      where: { status: StatusAgendamento.CONCLUIDO },
    });

    let relatorioConciliacao = 'Relatório de Conciliação:\n';

    for (const agendamento of agendamentosConcluidos) {
      const pagamento = await this.pagamentoRepository.findOne({
        where: { id_agendamento: agendamento.id_agendamento },
      });

      if (pagamento) {
        if (pagamento.valor_pago === agendamento.valor_servico) {
          await this.financeiroRepository.save({
            descricao: `Pagamento do agendamento ${agendamento.id_agendamento}`,
            tipo_pagamento: pagamento.tipo_pagamento, 
            preco: pagamento.valor_pago,
            status: 'concluído',
            categoria: 'entrada',
          });

          relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} conciliado com sucesso. Pagamento de R$ ${pagamento.valor_pago} recebido.\n`;
        } else {
          relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} com pagamento inconsistentes. Valor esperado: R$ ${agendamento.valor_servico}, mas pagamento foi R$ ${pagamento.valor_pago}.\n`;
        }
      } else {
        relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} sem pagamento registrado.\n`;
      }
    }

    return relatorioConciliacao;
  }
}

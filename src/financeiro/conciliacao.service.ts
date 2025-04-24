import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agendamento, StatusAgendamento } from "src/agendamento/entities/agendamento.entity";
import { Pagamento } from "src/pagamento/entities/pagamento.entity";
import { Repository } from "typeorm";
import { Financeiro } from "./entities/financeiro.entity";

@Injectable()
export class ConciliacaoService {
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
      try {
        const pagamento = await this.pagamentoRepository.findOne({
          where: { id_agendamento: agendamento.id_agendamento },
        });

        if (!pagamento) {
          relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} sem pagamento registrado.\n`;
          continue;
        }

        const jaConciliado = await this.financeiroRepository.findOne({
          where: { id_agendamento: agendamento.id_agendamento },
        });

        if (jaConciliado) {
          relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} já foi conciliado anteriormente.\n`;
          continue;
        }

        if (pagamento.valor_pago === agendamento.valor_servico) {
          await this.financeiroRepository.save({
            descricao: `Pagamento do agendamento ${agendamento.id_agendamento}`,
            tipo_pagamento: pagamento.tipo_pagamento,
            preco: pagamento.valor_pago,
            status: 'concluído',
            categoria: 'entrada',
            id_agendamento: agendamento.id_agendamento, 
          });

          relatorioConciliacao += `Agendamento ${agendamento.id_agendamento} conciliado com sucesso. Valor: R$ ${pagamento.valor_pago}\n`;
        } else {
          relatorioConciliacao += `Inconsistência no pagamento do agendamento ${agendamento.id_agendamento}. Esperado: R$ ${agendamento.valor_servico}, Recebido: R$ ${pagamento.valor_pago}\n`;
        }
      } catch (error) {
        console.error(`Erro ao conciliar agendamento ${agendamento.id_agendamento}:`, error);
        relatorioConciliacao += `Erro ao conciliar agendamento ${agendamento.id_agendamento}.\n`;
      }
    }

    return relatorioConciliacao;
  }
}

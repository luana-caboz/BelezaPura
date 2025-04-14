import { Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pagamento } from './entities/pagamento.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class PagamentoService {
  private pagamentos: Pagamento[] = [];

  create(createPagamentoDto: CreatePagamentoDto): Pagamento {
    const novoPagamento: Pagamento = {
      id: randomUUID(),
      ...createPagamentoDto,
    };
    this.pagamentos.push(novoPagamento);
    return novoPagamento;
  }

  findAll(): Pagamento[] {
    return this.pagamentos;
  }

  findOne(id: string): Pagamento {
    return this.pagamentos.find((pagamento) => pagamento.id === id);
  }

  update(id: string, updatePagamentoDto: UpdatePagamentoDto): Pagamento {
    const index = this.pagamentos.findIndex((pagamento) => pagamento.id === id);
    if (index === -1) return null;

    this.pagamentos[index] = {
      ...this.pagamentos[index],
      ...updatePagamentoDto,
    };
    return this.pagamentos[index];
  }

  delete(id: string): boolean {
    const index = this.pagamentos.findIndex((pagamento) => pagamento.id === id);
    if (index === -1) return false;

    this.pagamentos.splice(index, 1);
    return true;
  }
}

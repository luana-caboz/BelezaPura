import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AtualizarMembroDto } from 'src/equipe/dto/atualizar-membro.dto';
import { CriarMembroDto } from 'src/equipe/dto/criar-membro.dto';
import { MembroEquipe } from 'src/equipe/dto/entities/equipe.entity';

@Injectable()
export class EquipeService {
  private membrosEquipe: MembroEquipe[] = [];

  create(criarMembroEquipe: CriarMembroDto): MembroEquipe {
    const novoMembro: MembroEquipe = {
      id: randomUUID(),
      ...criarMembroEquipe,
    };
    this.membrosEquipe.push(novoMembro);
    return novoMembro;
  }

  findAll(): MembroEquipe[] {
    return this.membrosEquipe;
  }

  findOne(id: string): MembroEquipe {
    return this.membrosEquipe.find((membro) => membro.id === id);
  }

  update(id: string, atualizarMembro: AtualizarMembroDto): MembroEquipe {
    const index = this.membrosEquipe.findIndex((membro) => membro.id === id);
    if (index === -1) return null;

    this.membrosEquipe[index] = {
      ...this.membrosEquipe[index],
      ...atualizarMembro,
    };
    return this.membrosEquipe[index];
  }

  delete(id: string): boolean {
    const index = this.membrosEquipe.findIndex((membro) => membro.id === id);
    if (index === -1) return null;

    this.membrosEquipe.splice(index, 1);
    return true;
  }
}

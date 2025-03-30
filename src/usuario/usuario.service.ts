import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { Usuario } from 'src/usuario/dto/entities/usuario.entity';

@Injectable()
export class UsuarioService {
  private usuario: Usuario[] = [];

  create(criarUsuario: CriarUsuarioDto): Usuario {
    const novoUsuario: Usuario = {
      id: randomUUID(),
      ...criarUsuario,
    };
    this.usuario.push(novoUsuario);
    return novoUsuario;
  }

  findAll(): Usuario[] {
    return this.usuario;
  }

  findOne(id: string): Usuario {
    return this.usuario.find((usuario) => usuario.id === id);
  }

  async findByEmail(email: string) {
    return this.usuario.find((usuario) => usuario.email === email);
  }

  update(id: string, atualizarUsuario: AtualizarUsuarioDto): Usuario {
    const index = this.usuario.findIndex((usuario) => usuario.id === id);
    if (index === -1) return null;

    this.usuario[index] = {
      ...this.usuario[index],
      ...atualizarUsuario,
    };
    return this.usuario[index];
  }

  delete(id: string): boolean {
    const index = this.usuario.findIndex((usuario) => usuario.id === id);
    if (index === -1) return null;

    this.usuario.splice(index, 1);
    return true;
  }
}

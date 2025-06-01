import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(criarUsuario: CriarUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(criarUsuario);
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_profissional: id },
    });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async findByEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    atualizarUsuario: AtualizarUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, atualizarUsuario);
    return this.usuarioRepository.save(usuario);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.usuarioRepository.delete(id);
    return result.affected > 0;
  }
}

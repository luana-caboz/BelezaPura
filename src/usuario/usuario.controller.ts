import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { LoginDto } from 'src/usuario/dto/login-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usuarioService.findByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.senha !== loginDto.senha) {
      throw new BadRequestException('Senha inválida');
    }
    return { userId: user.id, message: 'Login efetuado com sucesso!' };
  }

  @Post()
  create(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuarioService.create(criarUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarUsuarioDto: AtualizarUsuarioDto,
  ) {
    return this.usuarioService.update(id, atualizarUsuarioDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }
}

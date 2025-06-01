import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/jwt-auth.guard';
import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { LoginDto } from 'src/usuario/dto/login-usuario.dto';
import { Perfil } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.senha,
    );

    return this.authService.login(user);
  }

  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() criarUsuarioDto: CriarUsuarioDto, @Request() req) {
    console.log('criarUsuarioDto', criarUsuarioDto);
    console.log('req.user', req.user);
    const usuariosExistentes = await this.usuarioService.findAll();

    if (usuariosExistentes.length == 0) {
      criarUsuarioDto.perfil = Perfil.ADMIN;
    } else {
      const usuarioLogado = req.user;
      if (!usuarioLogado || usuarioLogado.perfil !== Perfil.ADMIN) {
        throw new BadRequestException(
          'Apenas administradores podem criar usuários.',
        );
      }
    }

    return this.usuarioService.create(criarUsuarioDto);
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() atualizarUsuarioDto: AtualizarUsuarioDto,
  ) {
    return this.usuarioService.update(id, atualizarUsuarioDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }
}

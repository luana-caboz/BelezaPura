import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Perfil } from 'src/usuario/dto/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = Perfil.ADMIN;
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    const usuariosExistentes = await this.usuarioService.findAll();
    if (usuariosExistentes.length === 0) {
      return true;
    }

    if (!authorizationHeader) {
      throw new BadRequestException('Token de autenticação não fornecido.');
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new BadRequestException('Token de autenticação inválido.');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded;

      if (decoded.perfil !== requiredRole) {
        throw new BadRequestException(
          'Apenas administradores podem realizar essa ação.',
        );
      }
    } catch (error) {
      throw new BadRequestException('Token de autenticação inválido.');
    }
    return true;
  }
}

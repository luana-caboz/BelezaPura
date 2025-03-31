import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findByEmail(email);
    if (user && user.senha === senha) {
      const { senha, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, perfil: user.perfil };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

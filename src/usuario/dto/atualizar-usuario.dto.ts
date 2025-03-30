import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';

export class AtualizarUsuarioDto extends PartialType(CriarUsuarioDto) {}

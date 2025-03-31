import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Perfil } from 'src/usuario/dto/entities/usuario.entity';

export class CriarUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cargo: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  horario: string;

  @IsNotEmpty()
  @IsArray()
  servicos: string[];

  @IsNotEmpty()
  @IsEnum(Perfil)
  perfil: Perfil;
}

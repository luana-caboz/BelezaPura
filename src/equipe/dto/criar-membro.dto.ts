import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CriarMembroDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cargo: string;

  @IsNotEmpty()
  @IsString()
  horario: string;

  @IsNotEmpty()
  @IsArray()
  servicos: string[];
}

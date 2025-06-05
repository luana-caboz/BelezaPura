<<<<<<< Updated upstream
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CriarFinanceiroDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;
=======
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarFinanceiroDto {
  @IsOptional()
  @IsString()
  descricao?: string;
>>>>>>> Stashed changes

  @IsNotEmpty()
  @IsString()
  tipo_pagamento: string;

  @IsNotEmpty()
  @IsDecimal()
  preco: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;
<<<<<<< Updated upstream
=======

  @IsOptional()
  id_agendamento?: string;
>>>>>>> Stashed changes
}

import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarFinanceiroDto {
  @IsOptional()
  @IsString()
  descricao?: string;

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

  @IsOptional()
  id_agendamento?: string;
}

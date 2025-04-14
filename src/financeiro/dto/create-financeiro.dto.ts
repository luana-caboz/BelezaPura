import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CriarFinanceiroDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

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
}

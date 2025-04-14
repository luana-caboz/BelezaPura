import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  id_agendamento: number;

  @IsNotEmpty()
  @IsNumber()
  valor_pago: number;

  @IsNotEmpty()
  @IsDateString()
  data_pagamento: Date;
}

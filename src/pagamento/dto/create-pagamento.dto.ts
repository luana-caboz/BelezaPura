import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsString()
  id_agendamento: string;

  @IsNotEmpty()
  @IsNumber()
  valor_pago: number;

  @IsNotEmpty()
  @IsDate()
  data_pagamento: Date;

  @IsNotEmpty()
  @IsString()
  tipo_pagamento: string;
}

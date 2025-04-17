import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreatePagamentoDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsDate()
  dataPagamento: Date;

  @IsNotEmpty()
  @IsString()
  metodoPagamento: string;
}

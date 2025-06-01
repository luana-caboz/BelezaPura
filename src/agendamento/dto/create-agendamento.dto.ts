import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { StatusAgendamento } from '../entities/agendamento.entity';

export class CreateAgendamentoDto {
  @IsString()
  @IsNotEmpty()
  data_hora: string;

  @IsUUID()
  @IsNotEmpty()
  id_cliente: string;

  @IsUUID()
  @IsNotEmpty()
  id_profissional: string;

  @IsString()
  @IsNotEmpty()
  servico: string;

  @IsEnum(StatusAgendamento)
  status?: StatusAgendamento = StatusAgendamento.PENDENTE;
}

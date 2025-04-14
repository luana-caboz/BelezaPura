// agendamento.entity.ts
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusAgendamento {
  PENDENTE = 'pendente',
  CONCLUIDO = 'concluído',
  CANCELADO = 'cancelado',
}

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id_agendamento: string;

  @Column({ type: 'timestamp' })
  data_hora: Date;

  @Column({ type: 'enum', 
    enum: StatusAgendamento, 
    default: StatusAgendamento.PENDENTE })
  status: StatusAgendamento;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_profissional' })
  profissional: Usuario;

  @Column()
  servico: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_servico: number;
}

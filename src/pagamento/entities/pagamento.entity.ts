import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @Column()
  id_agendamento: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_pago: number;

  @Column({ type: 'timestamp' })
  data_pagamento: Date;
}

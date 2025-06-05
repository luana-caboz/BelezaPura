import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('pagamento')
@Unique(['id_agendamento'])
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id_pagamento: string;

  @Column({ nullable: false })
  id_agendamento: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_pago: number;

  @Column({ type: 'timestamp' })
  data_pagamento: Date;

  @Column({ type: 'varchar', length: 255 })
  tipo_pagamento: string;
}

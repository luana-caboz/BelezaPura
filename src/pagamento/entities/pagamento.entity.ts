import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id_pagamento: number;

  @Column()
  id_agendamento: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_pago: number;

  @Column({ type: 'timestamp' })
  data_pagamento: Date;

  @Column({ type: 'varchar', length: 255 })
  tipo_pagamento: string;
}

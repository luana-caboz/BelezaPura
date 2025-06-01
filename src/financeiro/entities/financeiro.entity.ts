import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('financeiro')
export class Financeiro {
  @PrimaryGeneratedColumn('uuid', { name: 'id_financeiro' })
  id_financeiro: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'varchar', length: 255 })
  tipo_pagamento: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  categoria: string;

  @Column({ nullable: true })
  id_agendamento?: string;

  @CreateDateColumn()
  data_criacao: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Perfil {
  ADMIN = 'admin',
  PROFISSIONAL = 'profissional',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid', { name: 'id_profissional' })
  id_profissional: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  cargo: string;

  @Column()
  horario: string;

  @Column('text', { array: true })
  servicos: string[];

  @Column({ type: 'enum', enum: Perfil })
  perfil: Perfil;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id_cliente: string;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;
}

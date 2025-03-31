export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  horario: string;
  servicos: string[];
  perfil: Perfil;
};

export enum Perfil {
  ADMIN = 'admin',
  PROFISSIONAL = 'profissional',
}

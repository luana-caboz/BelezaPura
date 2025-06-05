import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { Perfil } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    service = new UsuarioService();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo usuário', () => {
      const dto: CriarUsuarioDto = {
        nome: 'Ana',
        email: 'ana@email.com',
        senha: '123',
        cargo: 'Cabeleireira',
        horario: '08:00',
        servicos: ['Corte'],
        perfil: Perfil.PROFISSIONAL,
      };

      const usuario = service.create(dto);

      expect(usuario).toHaveProperty('id');
      expect(usuario.nome).toBe(dto.nome);
      expect(usuario.email).toBe(dto.email);
      expect(service.findAll()).toContainEqual(usuario);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários', () => {
      const usuarios = service.findAll();
      expect(Array.isArray(usuarios)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário pelo id', () => {
      const dto: CriarUsuarioDto = {
        nome: 'João',
        email: 'joao@email.com',
        senha: '456',
        cargo: 'Manicure',
        horario: '09:00',
        servicos: ['Unha'],
        perfil: Perfil.PROFISSIONAL,
      };

      const criado = service.create(dto);
      const encontrado = service.findOne(criado.id);

      expect(encontrado).toEqual(criado);
    });

    it('deve retornar undefined se o id não existir', () => {
      const usuario = service.findOne('id-inexistente');
      expect(usuario).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('deve retornar um usuário pelo email', async () => {
      const dto: CriarUsuarioDto = {
        nome: 'Maria',
        email: 'maria@email.com',
        senha: '789',
        cargo: 'Recepcionista',
        horario: '10:00',
        servicos: ['Agendamento'],
        perfil: Perfil.ADMIN,
      };

      const criado = service.create(dto);
      const resultado = await service.findByEmail(dto.email);

      expect(resultado).toEqual(criado);
    });

    it('deve retornar undefined se o email não existir', async () => {
      const resultado = await service.findByEmail('naoexiste@email.com');
      expect(resultado).toBeUndefined();
    });
  });

  describe('update', () => {
    it('deve atualizar os dados do usuário', () => {
      const dto: CriarUsuarioDto = {
        nome: 'Carlos',
        email: 'carlos@email.com',
        senha: '1234',
        cargo: 'Colorista',
        horario: '11:00',
        servicos: ['Tintura'],
        perfil: Perfil.PROFISSIONAL,
      };

      const criado = service.create(dto);
      const atualizacao: AtualizarUsuarioDto = { nome: 'Carlos Atualizado' };

      const atualizado = service.update(criado.id, atualizacao);

      expect(atualizado.nome).toBe('Carlos Atualizado');
    });

    it('deve retornar null se id não existir', () => {
      const atualizado = service.update('id-invalido', { nome: 'Novo' });
      expect(atualizado).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve deletar o usuário pelo id', () => {
      const dto: CriarUsuarioDto = {
        nome: 'Paula',
        email: 'paula@email.com',
        senha: '4321',
        cargo: 'Designer',
        horario: '12:00',
        servicos: ['Sobrancelha'],
        perfil: Perfil.PROFISSIONAL,
      };

      const criado = service.create(dto);
      const resultado = service.delete(criado.id);

      expect(resultado).toBe(true);
      expect(service.findOne(criado.id)).toBeUndefined();
    });

    it('deve retornar null se o id não existir', () => {
      const resultado = service.delete('id-falso');
      expect(resultado).toBeNull();
    });
  });
});

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { AtualizarUsuarioDto } from 'src/usuario/dto/atualizar-usuario.dto';
import { CriarUsuarioDto } from 'src/usuario/dto/criar-usuario.dto';
import { LoginDto } from 'src/usuario/dto/login-usuario.dto';
import { Perfil } from 'src/usuario/entities/usuario.entity';
import { UsuarioController } from 'src/usuario/usuario.controller';
import { UsuarioService } from 'src/usuario/usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let usuarioService: UsuarioService;
  let authService: AuthService;

  const mockUsuarioService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    authService = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('deve autenticar e retornar token', async () => {
      const loginDto: LoginDto = { email: 'teste@email.com', senha: '123456' };
      const userMock = { id: 1, email: loginDto.email };

      mockAuthService.validateUser.mockResolvedValue(userMock);
      mockAuthService.login.mockResolvedValue({ token: 'abc123' });

      const result = await controller.login(loginDto);

      expect(authService.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.senha);
      expect(authService.login).toHaveBeenCalledWith(userMock);
      expect(result).toEqual({ token: 'abc123' });
    });
  });

  describe('create', () => {
    it('deve permitir criação do primeiro usuário como ADMIN', async () => {
      const dto: CriarUsuarioDto = {
        nome: 'Ana',
        email: 'ana@email.com',
        senha: '123',
        cargo: 'Gerente',
        horario: '08:00',
        servicos: ['Corte'],
        perfil: Perfil.PROFISSIONAL, // será sobrescrito
      };

      mockUsuarioService.findAll.mockResolvedValue([]);
      mockUsuarioService.create.mockResolvedValue({
        ...dto,
        perfil: Perfil.ADMIN,
      });

      const result = await controller.create(dto, { user: null });

      expect(result.perfil).toBe(Perfil.ADMIN);
      expect(mockUsuarioService.create).toHaveBeenCalledWith({
        ...dto,
        perfil: Perfil.ADMIN,
      });
    });

    it('deve lançar erro se usuário logado não for ADMIN', async () => {
      const dto: CriarUsuarioDto = {
        nome: 'João',
        email: 'joao@email.com',
        senha: '456',
        cargo: 'Profissional',
        horario: '09:00',
        servicos: ['Corte'],
        perfil: Perfil.PROFISSIONAL,
      };

      mockUsuarioService.findAll.mockResolvedValue([{}]);

      const req = { user: { perfil: Perfil.PROFISSIONAL } };

      await expect(controller.create(dto, req)).rejects.toThrow(BadRequestException);
    });

    it('deve permitir ADMIN criar novos usuários', async () => {
      const dto: CriarUsuarioDto = {
        nome: 'Maria',
        email: 'maria@email.com',
        senha: '789',
        cargo: 'Profissional',
        horario: '10:00',
        servicos: ['Escova'],
        perfil: Perfil.PROFISSIONAL,
      };

      mockUsuarioService.findAll.mockResolvedValue([{}]);

      const req = { user: { perfil: Perfil.ADMIN } };
      mockUsuarioService.create.mockResolvedValue(dto);

      const result = await controller.create(dto, req);

      expect(result).toEqual(dto);
      expect(mockUsuarioService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários', async () => {
      const usuarios = [{ id: 1 }, { id: 2 }];
      mockUsuarioService.findAll.mockResolvedValue(usuarios);

      const result = await controller.findAll();
      expect(result).toEqual(usuarios);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário pelo id', async () => {
      const usuario = { id: '1', nome: 'Teste' };
      mockUsuarioService.findOne.mockResolvedValue(usuario);

      const result = await controller.findOne('1');
      expect(result).toEqual(usuario);
    });
  });

  describe('update', () => {
    it('deve atualizar os dados de um usuário', async () => {
      const dto: AtualizarUsuarioDto = { nome: 'Atualizado' };
      const updated = { id: '1', ...dto };

      mockUsuarioService.update.mockResolvedValue(updated);

      const result = await controller.update('1', dto);
      expect(result).toEqual(updated);
    });
  });

  describe('delete', () => {
    it('deve remover o usuário pelo id', async () => {
      const expected = { deleted: true };

      mockUsuarioService.delete.mockResolvedValue(expected);

      const result = await controller.delete('1');
      expect(result).toEqual(expected);
    });
  });
});

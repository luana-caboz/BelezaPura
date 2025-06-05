import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from 'src/clientes/clientes.controller';
import { ClientesService } from 'src/clientes/clientes.service';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/clientes/dto/update-cliente.dto';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  const mockClientesService = {
    create: jest.fn((dto: CreateClienteDto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => [
      { id: 1, nome: 'Ana', telefone: '123456789', cpf: '11111111111' },
    ]),
    findOne: jest.fn((id: number) => ({
      id,
      nome: 'Ana',
      telefone: '123456789',
      cpf: '11111111111',
    })),
    update: jest.fn((id: number, dto: UpdateClienteDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => ({
      message: `Cliente ${id} removido`,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: mockClientesService,
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('deve criar um novo cliente', () => {
      const dto: CreateClienteDto = {
        nome: 'Maria',
        telefone: '987654321',
        cpf: '22222222222',
      };

      expect(controller.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('deve retornar todos os clientes', () => {
      expect(controller.findAll()).toEqual([
        { id: 1, nome: 'Ana', telefone: '123456789', cpf: '11111111111' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('deve retornar um cliente pelo id', () => {
      expect(controller.findOne('1')).toEqual({
        id: 1,
        nome: 'Ana',
        telefone: '123456789',
        cpf: '11111111111',
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update()', () => {
    it('deve atualizar os dados de um cliente', () => {
      const dto: UpdateClienteDto = {
        telefone: '999999999',
      };
      expect(controller.update('1', dto)).toEqual({
        id: 1,
        ...dto,
      });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove()', () => {
    it('deve remover um cliente pelo id', () => {
      expect(controller.remove('1')).toEqual({
        message: 'Cliente 1 removido',
      });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
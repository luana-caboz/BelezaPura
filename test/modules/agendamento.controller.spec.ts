import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentoController } from '../../src/agendamento/agendamento.controller';
import { AgendamentoService } from '../../src/agendamento/agendamento.service';
import { CreateAgendamentoDto } from '../../src/agendamento/dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../../src/agendamento/dto/update-agendamento.dto';

describe('AgendamentoController', () => {
  let controller: AgendamentoController;
  let service: AgendamentoService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn().mockResolvedValue({ id_agendamento: '1', status: 'PENDENTE' }),
      findAll: jest.fn().mockResolvedValue([{ id_agendamento: '1' }, { id_agendamento: '2' }]),
      findOne: jest.fn().mockResolvedValue({ id_agendamento: '1' }),
      update: jest.fn().mockResolvedValue({ id_agendamento: '1', status: 'ATUALIZADO' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentoController],
      providers: [
        {
          provide: AgendamentoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(AgendamentoController);
    service = module.get(AgendamentoService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um agendamento', async () => {
    const dto: CreateAgendamentoDto = {
      id_cliente: '1',
      id_profissional: '2',
      data_hora: new Date().toISOString(),
      servico: 'Corte',
    };

    const res = await controller.create(dto);
    expect(res).toEqual({ id_agendamento: '1', status: 'PENDENTE' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve listar todos os agendamentos', async () => {
    const res = await controller.findAll();
    expect(res).toHaveLength(2);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve buscar um agendamento pelo id', async () => {
    const res = await controller.findOne('1');
    expect(res).toEqual({ id_agendamento: '1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('deve atualizar um agendamento', async () => {
    const dto: UpdateAgendamentoDto = { status: 'ATUALIZADO' as any };
    const res = await controller.update('1', dto);
    expect(res).toEqual({ id_agendamento: '1', status: 'ATUALIZADO' });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });
})
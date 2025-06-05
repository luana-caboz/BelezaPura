import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AgendamentoService } from '../../src/agendamento/agendamento.service';
import { CreateAgendamentoDto } from '../../src/agendamento/dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../../src/agendamento/dto/update-agendamento.dto';
import { StatusAgendamento } from '../../src/agendamento/entities/agendamento.entity';

describe('AgendamentoService', () => {
  let service: AgendamentoService;

  // mocks dos repositórios
  const agendamentoRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const usuarioRepo = { findOne: jest.fn() };
  const clienteRepo = { findOne: jest.fn() };

  beforeEach(() => {
    service = new AgendamentoService(
      agendamentoRepo as any,
      usuarioRepo as any,
      clienteRepo as any,
    );
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar quando cliente e profissional existem', async () => {
      const dto: CreateAgendamentoDto = {
        id_cliente: 'c1',
        id_profissional: 'u1',
        data_hora: new Date().toISOString(),
        servico: 'Teste',
      };

      clienteRepo.findOne.mockResolvedValue({ id_cliente: 'c1' });
      usuarioRepo.findOne.mockResolvedValue({ id_profissional: 'u1' });
      agendamentoRepo.create.mockReturnValue({ ...dto, status: StatusAgendamento.PENDENTE });
      agendamentoRepo.save.mockResolvedValue({ id_agendamento: '1', ...dto, status: StatusAgendamento.PENDENTE });

      const res = await service.create(dto);
      expect(clienteRepo.findOne).toHaveBeenCalledWith({ where: { id_cliente: dto.id_cliente } });
      expect(usuarioRepo.findOne).toHaveBeenCalledWith({ where: { id_profissional: dto.id_profissional } });
      expect(agendamentoRepo.create).toHaveBeenCalled();
      expect(agendamentoRepo.save).toHaveBeenCalled();
      expect(res).toEqual({ id_agendamento: '1', ...dto, status: StatusAgendamento.PENDENTE });
    });

    it('deve lançar NotFoundException quando faltar cliente ou profissional', async () => {
      clienteRepo.findOne.mockResolvedValue(null);
      usuarioRepo.findOne.mockResolvedValue(null);

      await expect(service.create({} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('deve retornar lista de agendamentos', async () => {
      agendamentoRepo.find.mockResolvedValue([{ id_agendamento: '1' }]);
      // a função interna atualizarAgendamentosConcluidos usa find e save; aqui simulamos sem erros
      jest.spyOn(service, 'atualizarAgendamentosConcluidos').mockResolvedValue();

      const res = await service.findAll();
      expect(service.atualizarAgendamentosConcluidos).toHaveBeenCalled();
      expect(agendamentoRepo.find).toHaveBeenCalledWith({
        relations: ['cliente', 'profissional'],
        order: { data_hora: 'ASC' },
      });
      expect(res).toEqual([{ id_agendamento: '1' }]);
    });
  });

  describe('findOne', () => {
    it('deve retornar um agendamento existente', async () => {
      jest.spyOn(service, 'atualizarAgendamentosConcluidos').mockResolvedValue();
      agendamentoRepo.findOne.mockResolvedValue({ id_agendamento: '1' });
      const res = await service.findOne('1');
      expect(res).toEqual({ id_agendamento: '1' });
    });

    it('deve lançar NotFoundException se não encontrar', async () => {
      jest.spyOn(service, 'atualizarAgendamentosConcluidos').mockResolvedValue();
      agendamentoRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar se existir e status válido', async () => {
      const dto: UpdateAgendamentoDto = { status: StatusAgendamento.CONCLUIDO };
      agendamentoRepo.findOne.mockResolvedValue({ id_agendamento: '1', data_hora: '', status: StatusAgendamento.PENDENTE });
      agendamentoRepo.save.mockResolvedValue({ id_agendamento: '1', status: StatusAgendamento.CONCLUIDO });
      const res = await service.update('1', dto);
      expect(agendamentoRepo.findOne).toHaveBeenCalledWith({
        where: { id_agendamento: '1' },
        relations: ['profissional'],
      });
      expect(agendamentoRepo.save).toHaveBeenCalled();
      expect(res).toEqual({ id_agendamento: '1', status: StatusAgendamento.CONCLUIDO });
    });

    it('deve lançar NotFoundException se não existir', async () => {
      agendamentoRepo.findOne.mockResolvedValue(null);
      await expect(service.update('1', {} as any)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException para status inválido', async () => {
      agendamentoRepo.findOne.mockResolvedValue({ id_agendamento: '1', status: StatusAgendamento.PENDENTE });
      await expect(service.update('1', { status: 'INVÁLIDO' } as any)).rejects.toThrow(BadRequestException);
    });
  });
});

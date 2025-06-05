import { ClientesService } from 'src/clientes/clientes.service';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/clientes/dto/update-cliente.dto';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(() => {
    service = new ClientesService();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve retornar a mensagem de criação de cliente', () => {
      const dto: CreateClienteDto = {
        nome: 'Maria',
        telefone: '999999999',
        cpf: '12345678900',
      };

      const result = service.create(dto);
      expect(result).toBe('This action adds a new cliente');
    });
  });

  describe('findAll', () => {
    it('deve retornar a mensagem de busca de todos os clientes', () => {
      const result = service.findAll();
      expect(result).toBe('This action returns all clientes');
    });
  });

  describe('findOne', () => {
    it('deve retornar a mensagem de cliente por id', () => {
      const id = 1;
      const result = service.findOne(id);
      expect(result).toBe(`This action returns a #${id} cliente`);
    });
  });

  describe('update', () => {
    it('deve retornar a mensagem de atualização de cliente', () => {
      const id = 2;
      const dto: UpdateClienteDto = {
        nome: 'Carlos',
      };

      const result = service.update(id, dto);
      expect(result).toBe(`This action updates a #${id} cliente`);
    });
  });

  describe('remove', () => {
    it('deve retornar a mensagem de remoção de cliente', () => {
      const id = 3;
      const result = service.remove(id);
      expect(result).toBe(`This action removes a #${id} cliente`);
    });
  });
});

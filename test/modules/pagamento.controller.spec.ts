import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from '../../src/pagamento/pagamento.controller';

describe('PagamentoController', () => {
  let controller: PagamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
    }).compile();

    controller = module.get<PagamentoController>(PagamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

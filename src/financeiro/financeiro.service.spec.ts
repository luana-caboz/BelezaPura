import { Test, TestingModule } from '@nestjs/testing';
import { FinanceiroService } from './financeiro.service';

describe('FinanceiroService', () => {
  let service: FinanceiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceiroService],
    }).compile();

    service = module.get<FinanceiroService>(FinanceiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

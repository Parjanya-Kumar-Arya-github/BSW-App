import { Test, TestingModule } from '@nestjs/testing';
import { PyqsService } from './pyqs.service';

describe('PyqsService', () => {
  let service: PyqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PyqsService],
    }).compile();

    service = module.get<PyqsService>(PyqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

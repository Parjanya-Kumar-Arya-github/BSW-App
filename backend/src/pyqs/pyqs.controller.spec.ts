import { Test, TestingModule } from '@nestjs/testing';
import { PyqsController } from './pyqs.controller';

describe('PyqsController', () => {
  let controller: PyqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PyqsController],
    }).compile();

    controller = module.get<PyqsController>(PyqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

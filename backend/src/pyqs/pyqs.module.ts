import { Module } from '@nestjs/common';
import { PyqsController } from './pyqs.controller';
import { PyqsService } from './pyqs.service';

@Module({
  controllers: [PyqsController],
  providers: [PyqsService]
})
export class PyqsModule {}

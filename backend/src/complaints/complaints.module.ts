import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [ComplaintsService,AuthService],
  controllers: [ComplaintsController]
})
export class ComplaintsModule {}

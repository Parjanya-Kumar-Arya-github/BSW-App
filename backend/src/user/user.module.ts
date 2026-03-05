import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UserService,AuthService],
  controllers: [UserController]
})
export class UserModule {}

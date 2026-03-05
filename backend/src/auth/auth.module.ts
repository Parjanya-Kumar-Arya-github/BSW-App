import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
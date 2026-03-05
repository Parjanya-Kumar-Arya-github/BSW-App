import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PyqsModule } from './pyqs/pyqs.module';
import { PrismaModule } from './prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import {ScheduleModule} from '@nestjs/schedule'
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { NoticesModule } from './notices/notices.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { AuthGuard } from './common/guards/auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PyqsModule, 
    PrismaModule,
    MulterModule.register({
      dest: '/public/uploads',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => {
        // Load Private Key for Signing
        const privateKey = fs.readFileSync(path.join(process.cwd(), 'secrets', 'private.key'), 'utf8');
        const publicKey = fs.readFileSync(path.join(process.cwd(), 'secrets', 'public.key'), 'utf8');

        return {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: { 
            expiresIn: '15m', 
            algorithm: 'RS256' // Important: Must be RS256
          },
          verifyOptions: { 
            algorithms: ['RS256'] 
          },
        };
      },
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/files',   // public URL prefix
      serveStaticOptions: {
        index: false,        // no directory index
        maxAge: '1d',        // cache static files
      },
    }),
    AuthModule,
    MailModule,
    NoticesModule,
    ComplaintsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService]
  
})
export class AppModule { }

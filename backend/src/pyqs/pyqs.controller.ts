import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PyqsService } from './pyqs.service';
import { PyqsDTO } from './pyqs.dto';
import { memoryOptions } from './multer.storage.config';
// import { Roles, RolesGuard } from 'src/auth/role.gaurd';
// import { AuthGuard } from 'src/auth/auth.service';
// import { Role } from '@prisma/client';

@Controller('pyqs')
export class PyqsController {
  constructor(private readonly pyqsService: PyqsService) {}

  @Get('/')
  async getTree() {
    return this.pyqsService.getTreeFromDatabase();
  }

//   @Post('/upload')
//   @Roles(Role.ADMIN, Role.SUPERADMIN, Role.PYQADMIN)
//   @UseGuards(AuthGuard, RolesGuard)
//   @UseInterceptors(FileInterceptor('file', memoryOptions))
//   async upload(
//     @UploadedFile() file: Express.Multer.File,
//     @Body(new ValidationPipe({ whitelist: true })) data: PyqsDTO,
//     @Req() req: any,
//   ) {
//     if (!file) {
//       throw new BadRequestException('File is required');
//     }

//     if (
//       !file.mimetype.startsWith('image/') &&
//       !file.mimetype.startsWith('application/pdf')
//     ) {
//       throw new BadRequestException('Only image or PDF files allowed');
//     }

//     try {
//       return await this.pyqsService.uploadFile(data, file, req.user.id);
//     } catch (err) {
//       if (err instanceof BadRequestException) throw err;
//       throw new InternalServerErrorException('Upload failed');
//     }
//   }
}

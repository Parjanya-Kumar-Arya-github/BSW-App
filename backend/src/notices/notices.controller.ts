import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


import { NoticesService } from './notices.service';
import { NoticesDTO, SubmitNoticeDTO } from './dto/notices.dto';
import { noticeUploadConfig } from './config/upload.config';
import { FileUploadExceptionFilter } from './config/filter.multer';


@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  /* ---------- Record User ---------- */

  @Post('/record')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async recordUser(@Body() body: NoticesDTO) {
    const { name, email, entryNumber, phoneNumber } = body;
    return this.noticesService.recordUser(
      name,
      email,
      entryNumber,
      phoneNumber,
    );
  }

  /* ---------- Submit Notice WITH FILES ---------- */

  @Post('/submitNotice')
  @UseFilters(FileUploadExceptionFilter) 
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @UseInterceptors(
    FilesInterceptor('attachments', 5, noticeUploadConfig),
  )
  async submitNotice(
    @Body() body: SubmitNoticeDTO,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      const data = await this.noticesService.submitNotice(
        body,
        files || [],
      );

      return {
        success: true,
        message: 'Notice submitted successfully',
        data,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Database error');
      }
      if (error instanceof BadRequestException) throw error;

      console.error(error);
      throw new InternalServerErrorException(
        'Failed to submit notice',
      );
    }
  }
}

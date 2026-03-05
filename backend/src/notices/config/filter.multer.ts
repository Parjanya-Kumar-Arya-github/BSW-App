import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { MulterError } from 'multer';

@Catch(MulterError, BadRequestException)
export class FileUploadExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let message = 'File upload failed';
    let status = 400;

    if (exception instanceof MulterError) {
      // Handle Multer specific errors
      switch (exception.code) {
        case 'LIMIT_FILE_SIZE':
          message = 'File is too large. Maximum size is 10MB.';
          break;
        case 'LIMIT_FILE_COUNT':
          message = 'Too many files. Maximum allowed is 5.';
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          message = 'Unexpected field name for files.';
          break;
        default:
          message = exception.message;
      }
    } else if (exception instanceof BadRequestException) {
      // Handle the "Only PDF/SVG/Image allowed" error from your config
      const responseMsg = exception.getResponse();
      message = typeof responseMsg === 'object' && 'message' in responseMsg 
        ? (responseMsg as any).message 
        : exception.message;
    }
    
    console.log('[FileUploadError]', message);
    
    response.status(status).json({
      statusCode: status,
      message: message, // This is what the frontend will display
      error: 'Bad Request',
    });
  }
}
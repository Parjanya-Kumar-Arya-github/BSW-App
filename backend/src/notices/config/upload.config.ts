import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/svg+xml' // Added SVG support
];

export const noticeUploadConfig = {
  storage: diskStorage({
    destination: './public/uploads/notices',
    filename: (_req, file, cb) => {
      const unique =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          'Only PDF, SVG, and valid Image files (JPG, PNG, WEBP) are allowed',
        ),
        false,
      );
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5,
  },
};
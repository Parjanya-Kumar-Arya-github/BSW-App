import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubmitNoticeDTO } from './dto/notices.dto';
import { NoticeCategory, RecipientType } from '@prisma/client';


@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  async recordUser(
    name: string,
    email: string,
    entryNumber: string,
    phoneNumber: string,
  ) {
    return this.prisma.noticeRecord.create({
      data: { name, email, entryNumber, phoneNumber },
    });
  }

  async submitNotice(
    body: SubmitNoticeDTO,
    files: Express.Multer.File[],
  ) {
    const {
      requesterName,
      email,
      mobile,
      organization,
      category,
      categoryOther,
      subject,
      content,
      recipients,
      recipientsOther,
      preferredDate,
      preferredTime,
      notes,
    } = body;

    if (
      category === NoticeCategory.OTHERS &&
      !categoryOther?.trim()
    ) {
      throw new BadRequestException(
        'categoryOther is required when category is OTHERS',
      );
    }

    if (
      recipients === RecipientType.OTHERS &&
      !recipientsOther?.trim()
    ) {
      throw new BadRequestException(
        'recipientsOther is required when recipients is OTHERS',
      );
    }

    const parsedDate = new Date(preferredDate);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid preferredDate');
    }

    return this.prisma.$transaction(async (tx) => {
      const notice = await tx.notice.create({
        data: {
          requesterName,
          email,
          mobile,
          organization,
          category,
          categoryOther:
            category === NoticeCategory.OTHERS 
              ? categoryOther?.trim()
              : null,
          subject,
          content,
          recipients,
          recipientsOther:
            recipients === RecipientType.OTHERS || RecipientType.SPECIFIC_DEPARTMENT || RecipientType.SPECIFIC_HOSTEL
              ? recipientsOther?.trim()
              : null,
          preferredDate: parsedDate,
          preferredTime,
          notes: notes?.trim() || null,
        },
      });

      for (const file of files) {
        await tx.attachment.create({
          data: {
            noticeId: notice.id, // UUID (matches your schema)
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            fileUrl: file.path,
          },
        });
      }

      return notice;
    });
  }
}

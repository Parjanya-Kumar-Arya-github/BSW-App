import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsDateString,
  ValidateIf,
  Matches,
} from 'class-validator';
import { NoticeCategory, RecipientType } from './notices.enums';

/* ---------- Google Group / Record ---------- */

export class NoticesDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[0-9]{4}[A-Z]{2}[0-9]{5}$/, {
    message: 'Entry number must be of form ddddAAddddd',
  })
  entryNumber: string;

  @IsPhoneNumber('IN', {
    message: 'Phone number must be a valid Indian phone number',
  })
  phoneNumber: string;
}

/* ---------- Submit Notice ---------- */

export class SubmitNoticeDTO {
  @IsString()
  requesterName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  mobile: string;

  @IsString()
  organization: string;

  @IsEnum(NoticeCategory)
  category: NoticeCategory;

  @ValidateIf(o => o.category === NoticeCategory.OTHERS)
  @IsString()
  categoryOther?: string;

  @IsString()
  subject: string;

  @IsString()
  content: string;

  @IsEnum(RecipientType)
  recipients: RecipientType;

  @ValidateIf(o => o.recipients === RecipientType.OTHERS || o.recipients === RecipientType.SPECIFIC_DEPARTMENT || o.recipients === RecipientType.SPECIFIC_HOSTEL)
  @IsString()
  recipientsOther?: string;

  @IsDateString({}, { message: 'preferredDate must be ISO format' })
  preferredDate: string;

  @IsString()
  preferredTime: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

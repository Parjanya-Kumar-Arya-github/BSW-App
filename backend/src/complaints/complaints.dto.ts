import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ComplaintCategory,
  ComplaintPriority,
  ComplaintStatus,
} from '@prisma/client';

/* ---------------- ATTACHMENT ---------------- */

export class AttachmentDto {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsString()
  fileUrl: string;

  fileSize: number;
}

/* ---------------- CREATE ---------------- */

export class CreateComplaintDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ComplaintCategory)
  category: ComplaintCategory;

  @IsOptional()
  @IsEnum(ComplaintPriority)
  priority?: ComplaintPriority;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}

/* ---------------- UPDATE ---------------- */

export class UpdateComplaintDto {
  @IsMongoId()
  complaintId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ComplaintCategory)
  category?: ComplaintCategory;

  @IsOptional()
  @IsEnum(ComplaintPriority)
  priority?: ComplaintPriority;

  @IsOptional()
  @IsEnum(ComplaintStatus)
  status?: ComplaintStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}

/* ---------------- DELETE ---------------- */

export class DeleteComplaintDto {
  @IsMongoId()
  complaintId: string;
}

/* ---------------- GET ---------------- */

export class GetComplaintDto {
  @IsMongoId()
  complaintId: string;
}

/* ---------------- VOTE ---------------- */

export class ComplaintVoteDto {
  @IsMongoId()
  complaintId: string;
}

/* ---------------- REPLIES ---------------- */

export class CreateReplyDto {
  @IsMongoId()
  complaintId: string;

  @IsString()
  content: string;
}

export class UpdateReplyDto {
  @IsMongoId()
  replyId: string;

  @IsString()
  content: string;
}

export class DeleteReplyDto {
  @IsMongoId()
  replyId: string;
}

export class GetRepliesDto {
  @IsMongoId()
  complaintId: string;
}

export class ReplyVoteDto {
  @IsMongoId()
  replyId: string;
}

/* ---------------- RESOLVE ---------------- */

export class ResolveComplaintDto {
  @IsMongoId()
  complaintId: string;

  @IsEnum(ComplaintStatus)
  status: ComplaintStatus;
}

import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import {
  CreateComplaintDto,
  UpdateComplaintDto,
  CreateReplyDto,
  UpdateReplyDto,
  ResolveComplaintDto,
} from './complaints.dto';
import { BSWEmailTemplates } from 'src/mail/templates/email.templates';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService, private mailService: MailService) {}

  /* ---------------- CREATE ---------------- */
  async createComplaint(userId: string, dto: CreateComplaintDto) {
    return await this.prisma.complaint.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        priority: dto.priority,
        isAnonymous: dto.isAnonymous,
        userId,
        attachments: dto.attachments
          ? {
              create: dto.attachments.map((a) => ({
                fileName: a.fileName,
                fileType: a.fileType,
                fileUrl: a.fileUrl,
                fileSize: a.fileSize,
              })),
            }
          : undefined,
      },
      include: {
        attachments: true,
      },
    });
  }

  /* ---------------- UPDATE ---------------- */
  async updateComplaint(userId: string, dto: UpdateComplaintDto) {
    const complaint = await this.prisma.complaint.findUnique({
        where: { id: dto.complaintId },
      });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    if (complaint.userId !== userId) {
      throw new UnauthorizedException(
        'You cannot update this complaint',
      );
    }

    return await this.prisma.complaint.update({
    where: { id: dto.complaintId },
    data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        priority: dto.priority,
        status: dto.status,

        attachments: dto.attachments
        ? {
            create: dto.attachments.map((a) => ({
                fileName: a.fileName,
                fileType: a.fileType,
                fileUrl: a.fileUrl,
                fileSize: a.fileSize,
            })),
            }
        : undefined,
    },
    include: {
        attachments: true,
    },
    });
  }

  /* ---------------- DELETE ---------------- */
  async deleteComplaint(userId: string, complaintId: string) {
    const complaint =
      await this.prisma.complaint.findUnique({
        where: { id: complaintId },
      });

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    if (complaint.userId !== userId) {
      throw new UnauthorizedException(
        'You cannot delete this complaint',
      );
    }

    return await this.prisma.complaint.delete({
      where: { id: complaintId },
    });
  }

  /* ---------------- GET ONE ---------------- */
  async getComplaint(complaintId: string) {
    return await this.prisma.complaint.findUnique({
      where: { id: complaintId },
      include: {
        replies: true,
        upvotes: true,
        downvotes: true,
        attachments: true,
      },
    });
  }

  /* ---------------- GET ALL ---------------- */
  async getAllComplaints() {
    return await this.prisma.complaint.findMany({
      include: {
        upvotes: true,
        downvotes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ---------------- MY COMPLAINTS ---------------- */
  async getUserComplaints(userId: string) {
    return await this.prisma.complaint.findMany({
      where: { userId },
      include: {
        upvotes: true,
        downvotes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ---------------- UPVOTE COMPLAINT ---------------- */
  async upvoteComplaint(userId: string, complaintId: string) {
    await this.prisma.complaintDownvote.deleteMany({
      where: { userId, complaintId },
    });

    return await this.prisma.complaintUpvote.upsert({
      where: {
        userId_complaintId: { userId, complaintId },
      },
      update: {},
      create: { userId, complaintId },
    });
  }

  /* ---------------- DOWNVOTE COMPLAINT ---------------- */
  async downvoteComplaint(userId: string, complaintId: string) {
    await this.prisma.complaintUpvote.deleteMany({
      where: { userId, complaintId },
    });

    return await this.prisma.complaintDownvote.upsert({
      where: {
        userId_complaintId: { userId, complaintId },
      },
      update: {},
      create: { userId, complaintId },
    });
  }

  /* ---------------- CREATE REPLY ---------------- */
  async createReply(userId: string, dto: CreateReplyDto) {
    return await this.prisma.complaintReply.create({
      data: {
        complaintId: dto.complaintId,
        content: dto.content,
        userId,
      },
      include: {
        complaint: true,
      },
    });
  }

  /* ---------------- UPDATE REPLY ---------------- */
  async updateReply(userId: string, dto: UpdateReplyDto) {
    const reply = await this.prisma.complaintReply.findUnique({
        where: { id: dto.replyId },
      });

    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    if (reply.userId !== userId) {
      throw new UnauthorizedException(
        'You cannot update this reply',
      );
    }

    return await this.prisma.complaintReply.update({
      where: { id: dto.replyId },
      data: { content: dto.content },
    });
  }

  /* ---------------- DELETE REPLY ---------------- */
  async deleteReply(userId: string, replyId: string) {
    const reply = await this.prisma.complaintReply.findUnique({
        where: { id: replyId },
      });

    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    if (reply.userId !== userId) {
      throw new UnauthorizedException(
        'You cannot delete this reply',
      );
    }

    return await this.prisma.complaintReply.delete({
      where: { id: replyId },
    });
  }

  /* ---------------- GET REPLIES ---------------- */
  async getReplies(complaintId: string) {
    return await this.prisma.complaintReply.findMany({
      where: { complaintId },
      include: {
        upvotes: true,
        downvotes: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  /* ---------------- GET ALL MY REPLIES ---------------- */
  async getAllMyReplies(userId: string) {
    return await this.prisma.complaintReply.findMany({
      where: { userId },
      include: {
        complaint: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ---------- GET COMPLAINTS I REPLIED TO ------------ */
  async getComplaintsIReplied(userId: string) {
    const replies = await this.prisma.complaintReply.findMany({
        where: { userId },
        select: { complaintId: true },
        distinct: ['complaintId'],
      });

    const complaintIds = replies.map(
      (r) => r.complaintId,
    );

    return await this.prisma.complaint.findMany({
      where: { id: { in: complaintIds } },
    });
  }

  /* ---------- UPVOTE REPLY ------------ */
  async upvoteReply(replyId: string, userId: string) {
    await this.prisma.replyDownvote.deleteMany({
      where: { userId, replyId },
    });

    return await this.prisma.replyUpvote.upsert({
      where: {
        userId_replyId: { userId, replyId },
      },
      update: {},
      create: { userId, replyId },
    });
  }

  /* ---------- DOWNVOTE REPLY ------------ */
  async downvoteReply(replyId: string, userId: string) {
    await this.prisma.replyUpvote.deleteMany({
      where: { userId, replyId },
    });

    return await this.prisma.replyDownvote.upsert({
      where: {
        userId_replyId: { userId, replyId },
      },
      update: {},
      create: { userId, replyId },
    });
  }

  /* ---------------- RESOLVE ---------------- */
  async resolveComplaint(name: string, email: string, dto: ResolveComplaintDto) {
    await this.mailService.sendMail(email, "Complaint Resolved", BSWEmailTemplates.getComplaintResolvedEmail(name, dto.complaintId));
    return await this.prisma.complaint.update({
      where: { id: dto.complaintId },
      data: {
        status: dto.status,
        resolvedAt:
          dto.status === 'RESOLVED'
            ? new Date()
            : null,
      },
    });
  }
}

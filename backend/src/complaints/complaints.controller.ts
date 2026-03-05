import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  CreateComplaintDto,
  UpdateComplaintDto,
  DeleteComplaintDto,
  GetComplaintDto,
  ComplaintVoteDto,
  CreateReplyDto,
  UpdateReplyDto,
  DeleteReplyDto,
  GetRepliesDto,
  ReplyVoteDto,
  ResolveComplaintDto,
} from './complaints.dto';

@Controller('complaints')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ComplaintsController {
    constructor(private readonly complaintsService: ComplaintsService) {}

    private handlePrismaError(error: any, context: string) {
    if (error.code === 'P2002') {
      throw new HttpException(`Duplicate entry for ${context}.`, 400);
    }else if(error.code === 'P2025') {
      throw new HttpException(`No record found for ${context}.`, 404);
    }else if(error.code === 'P2003') {
      throw new HttpException(`Foreign key constraint failed for ${context}.`, 400);
    }else if(error.code === 'P2004') {
      throw new HttpException(`A constraint failed on the database for ${context}.`, 400);
    }else if(error.code === 'P2005') {
      throw new HttpException(`Value too long for ${context}.`, 400);
    }else if(error.code === 'P2006') {
      throw new HttpException(`Invalid value for ${context}.`, 400);
    }else if(error.code === 'P2007') {
      throw new HttpException(`Data validation error for ${context}.`, 400);
    }else if(error.code === 'P2008') {
      throw new HttpException(`Failed to connect to the database for ${context}.`, 500);
    }else if(error.code === 'P2009') {
      throw new HttpException(`Invalid query for ${context}.`, 400);
    }else if(error.code === 'P2010') {
      throw new HttpException(`Raw query failed for ${context}.`, 400);
    }else if(error.code === 'P2011') {
      throw new HttpException(`Transaction failed for ${context}.`, 500);
    }else if(error.code === 'P2012') {
      throw new HttpException(`Unknown error occurred for ${context}.`, 500);
    }
    // error for invalid ObjectId format
    else if(error.code === 'P2026') {
      throw new HttpException(`Invalid ID format for ${context}.`, 400);
    }
    else {
      throw new InternalServerErrorException(`An unexpected error occurred for ${context}.`);
    }
  }

/* ---------------- CREATE ---------------- */
  @Post('create')
  @UseGuards(AuthGuard)
  async createComplaint(@Req() req, @Body() dto: CreateComplaintDto) {
    try {
      return await this.complaintsService.createComplaint(req.user.id, dto);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'create complaint');
      throw new InternalServerErrorException('An unexpected error occurred during complaint creation');
    }
  }

/* ---------------- UPDATE ---------------- */
  @Patch('update')
  @UseGuards(AuthGuard)
  async updateComplaint(@Req() req, @Body() dto: UpdateComplaintDto,) {
    try {
      return await this.complaintsService.updateComplaint(req.user.id, dto);
    } catch (error) {
        console.log(error);
        if(error instanceof HttpException) {
          throw error; // Re-throw known HTTP exceptions
        }
        this.handlePrismaError(error, 'update complaint');
        throw new InternalServerErrorException('An unexpected error occurred during complaint update');
    }
  }

/* ---------------- DELETE ---------------- */
  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteComplaint(@Req() req, @Body() dto: DeleteComplaintDto) {
    try {
      return await this.complaintsService.deleteComplaint(req.user.id, dto.complaintId);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'delete complaint');
      throw new InternalServerErrorException('An unexpected error occurred during complaint deletion');
    }
  }

/* ---------------- GET ONE ---------------- */
  @Get(':id')
  @UseGuards(AuthGuard)
  async getComplaint(@Param() params: GetComplaintDto) {
    try {
      return await this.complaintsService.getComplaint(params.complaintId);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'get complaint');
      throw new InternalServerErrorException('An unexpected error occurred while retrieving the complaint');
    }
  }

/* ---------------- GET ALL ---------------- */
  @Get()
  @UseGuards(AuthGuard)
  async getAllComplaints() {
    try {
      return await this.complaintsService.getAllComplaints();
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'get all complaints');
      throw new InternalServerErrorException('An unexpected error occurred while retrieving all complaints');
    }
  }

/* ---------------- MY COMPLAINTS ---------------- */
  @Get('me')
  @UseGuards(AuthGuard)
  async getMyComplaints(@Req() req) {
    try {
      return await this.complaintsService.getUserComplaints(req.user.id);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'get user complaints');
      throw new InternalServerErrorException('An unexpected error occurred while retrieving user complaints');
    }
  }

  /* ---------------- VOTES ---------------- */
  @Post('upvote')
  @UseGuards(AuthGuard)
  async upvote(@Req() req, @Body() dto: ComplaintVoteDto) {
    try {
        return await this.complaintsService.upvoteComplaint(req.user.id, dto.complaintId);
    } catch (error) {
        console.log(error);
        if(error instanceof HttpException) {
            throw error; // Re-throw known HTTP exceptions
        }
        this.handlePrismaError(error, 'upvote complaint');
        throw new InternalServerErrorException('An unexpected error occurred while upvoting the complaint');
    }
  }

  @Post('downvote')
  @UseGuards(AuthGuard)
  async downvote(@Req() req, @Body() dto: ComplaintVoteDto) {
    try {
        return await this.complaintsService.downvoteComplaint(req.user.id, dto.complaintId);
    } catch (error) {
        console.log(error);
        if(error instanceof HttpException) {
            throw error; // Re-throw known HTTP exceptions
        }
        this.handlePrismaError(error, 'downvote complaint');
        throw new InternalServerErrorException('An unexpected error occurred while downvoting the complaint');
    }
  }

  /* ---------------- REPLY CRUD ---------------- */
  @Post('reply')
  @UseGuards(AuthGuard)
  async createReply(@Req() req, @Body() dto: CreateReplyDto) {
    try {
      return await this.complaintsService.createReply(req.user.id, dto);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'create reply');
      throw new InternalServerErrorException('An unexpected error occurred while creating the reply');
    }
  }

  @Patch('reply')
  @UseGuards(AuthGuard)
  async updateReply(@Req() req, @Body() dto: UpdateReplyDto) {
    try {
      return await this.complaintsService.updateReply(req.user.id, dto);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'update reply');
      throw new InternalServerErrorException('An unexpected error occurred while updating the reply');
    }
  }

  @Delete('reply')
  @UseGuards(AuthGuard)
  async deleteReply(@Req() req, @Body() dto: DeleteReplyDto) {
    try {
      return await this.complaintsService.deleteReply(req.user.id, dto.replyId);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'delete reply');
      throw new InternalServerErrorException('An unexpected error occurred while deleting the reply');
    }
  }

  @Get('reply/:complaintId')
  @UseGuards(AuthGuard)
  async getReplies(@Param() dto: GetRepliesDto) {
    try {
      return await this.complaintsService.getReplies(dto.complaintId);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'get replies');
      throw new InternalServerErrorException('An unexpected error occurred while retrieving replies');
    }
  }

/* ---------------- GET MY REPLIES ---------------- */
  @Get('reply/me')
  @UseGuards(AuthGuard)
  async getAllMyReplies(@Req() req: any) {
    try {
        return await this.complaintsService.getAllMyReplies(req.user.id);
    } catch (error) {
        console.log(error);
        if (error instanceof HttpException) {
            throw error;
        }
        this.handlePrismaError(error, 'get my replies');
        throw new InternalServerErrorException('An unexpected error occurred while retrieving your replies');
    }
  }

/* ---------- GET COMPLAINTS I REPLIED TO ------------ */
  @Get('reply/me/complaints')
  @UseGuards(AuthGuard)
  async getComplaintsIReplied(@Req() req: any) {
    try {
        return await this.complaintsService.getComplaintsIReplied(req.user.id);
    } catch (error) {
        console.log(error);
        if (error instanceof HttpException) {
            throw error;
        }
        this.handlePrismaError(error, 'get complaints I replied');
        throw new InternalServerErrorException('An unexpected error occurred while retrieving complaints you replied to');
    }
  }


/* ---------- UPVOTE REPLY ------------ */
  @Post('reply/:replyId/upvote')
  @UseGuards(AuthGuard)
  async upvoteReply(@Req() req: any, dto: ReplyVoteDto) {
    try {
        return await this.complaintsService.upvoteReply(dto.replyId, req.user.id);
    } catch (error) {
        console.log(error);
        if (error instanceof HttpException) {
            throw error;
        }
        this.handlePrismaError(error, 'upvote reply');
        throw new InternalServerErrorException('An unexpected error occurred while upvoting the reply');
    }
  }


/* ---------------- Downvote reply ---------------- */
  @Post('reply/:replyId/downvote')
  @UseGuards(AuthGuard)
  async downvoteReply(@Req() req: any, dto: ReplyVoteDto) {
    try {
        return await this.complaintsService.downvoteReply(dto.replyId, req.user.id,);
    } catch (error) {
        console.log(error);
        if (error instanceof HttpException) {
            throw error;
        }
        this.handlePrismaError(error, 'downvote reply');
        throw new InternalServerErrorException('An unexpected error occurred while downvoting the reply');
    }
  }

/* ---------------- RESOLVE ---------------- */
  @Patch('resolve')
  @UseGuards(AuthGuard)
  async resolveComplaint(@Req() req: any, @Body() dto: ResolveComplaintDto) {
    try{
        return this.complaintsService.resolveComplaint(req.user.name, req.user.email, dto);
    } catch (error) {
        console.log(error);
        if(error instanceof HttpException) {
            throw error; // Re-throw known HTTP exceptions
        }
        this.handlePrismaError(error, 'resolve complaint');
        throw new InternalServerErrorException('An unexpected error occurred while resolving the complaint');
    }
  }
}

import { Body, Controller, Get, HttpException, InternalServerErrorException, Param, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { mongoIdDto, UpdateProfileDto } from './dtos/update.dto';
import { profile } from 'console';

@Controller('user')
@UsePipes(new ValidationPipe({whitelist: true}))
export class UserController {
    constructor(private readonly userService:UserService) {}

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


    @Put('profile')
    @UseGuards(AuthGuard)
    async updateProfile(@Req() req:any,@Body() profileData:UpdateProfileDto) {
        // Implementation for updating user profile
        const user = req.user;
        let data = profileData;
        if(!user.isExternal){
            data  = {...profileData,name: user.name};
        }
        try {
            const updatedUser = await this.userService.updateProfile(user.id, data);
            return {
                success: true,
                message: 'Profile updated successfully',
                user: updatedUser,
            };
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }

            this.handlePrismaError(error, 'updateProfile');
        }
    }

    @Get('profile/:id')
    async getUserProfile(@Param('id') id: string) {
        try {
            if(id.length !== 24){
                throw new HttpException('Invalid ID format', 400);
            }
            const user = await this.userService.getUserById(id);
            if (!user) {
                throw new HttpException('User not found', 404);
            }
            return {
                success: true,
                user,
            };
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }

            this.handlePrismaError(error, 'getUserProfile');
        }
    }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  VerifyOtpDto,
  OnboardDto,
  LoginDto,
  RequestResetDto,
  ResetPasswordDto,
  UserForPortalDto,
} from './auth.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PortalGuard } from 'src/common/guards/api.guard';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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


  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    try {
      return await this.authService.signup(dto);
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'signup');
      throw new InternalServerErrorException('An unexpected error occurred during signup');
    }
  }

  @UseGuards(PortalGuard)
  @Get('internal/sync/getUser')
  async getUserForPortal(@Req() req:any ) {
    try {
      const userId = req.userId; // Extracted from PortalGuard
      if(!userId) {
        throw new HttpException('userId is required', 400);
      }
      return await this.authService.getUserForPortal(userId);
    } catch (error) {
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'fetching user for portal');
      throw new InternalServerErrorException('An unexpected error occurred while fetching user for portal');
    }
  }



  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(@Req() req: any) {
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User context missing from request');
    }

    const { password, ...safeUser } = user;

    return {
      success: true,
      user: safeUser,
    };
  }


  @Get('verifyToken')
  async verifyToken(@Query('token') token: string) {
    try {
      if(!token) {
        throw new HttpException('Token is required', 400);
      }
      return await this.authService.verifyToken(token);
    } catch (error) {
      if(error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      this.handlePrismaError(error, 'token verification');
      throw new InternalServerErrorException('An unexpected error occurred during token verification');
    }
  }

  @Post('onboard')
  async onboard(
    @Query('token') token: string, 
    @Body() dto: OnboardDto,
    @Res({ passthrough: true }) res: any
  ) {
    try {
      if (!token) {
        throw new HttpException('Onboard token is required', HttpStatus.BAD_REQUEST);
      }

      // 1. Call Service
      const { access_token, refresh_token, user, message } = await this.authService.onboard(token, dto);

      const atExpiry = this.parseDuration(process.env.ACCESS_TOKEN_EXPIRY || '15m');
      const rtExpiry = this.parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');

      // 3. Define Cookie Options based on ENV
      const cookieOptions = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
        secure: process.env.COOKIE_SECURE === 'true', // true for https
        sameSite: (process.env.COOKIE_SAME_SITE?.toLowerCase() || 'none') as 'none' | 'lax' | 'strict',
        domain: process.env.COOKIES_DOMAIN,
        path: '/',
      };

      // 4. Set Cookies
      res.cookie('bsw_access_token', access_token, {
        ...cookieOptions,
        maxAge: atExpiry,
      });

      res.cookie('bsw_refresh_token', refresh_token, {
        ...cookieOptions,
        maxAge: rtExpiry,
      });

      // 5. Return JSON response
      return {
        success: true,
        message,
        user,
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      // Assuming this helper exists in your class
      this.handlePrismaError(error, 'onboarding');
    }
  }

  private parseDuration = (duration: string) => {
        const unit = duration.slice(-1);
        const value = parseInt(duration.slice(0, -1));
        if (isNaN(value)) return 900000; // default 15m
        switch (unit) {
          case 'm': return value * 60 * 1000;
          case 'h': return value * 60 * 60 * 1000;
          case 'd': return value * 24 * 60 * 60 * 1000;
          default: return value; 
        }
      };

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: any) {
    try {
      const {access_token,refresh_token,user} =  await this.authService.login(dto.email, dto.password);
      // Set cookies with same options as onboarding
      const cookieOptions = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
        secure: process.env.COOKIE_SECURE === 'true', // true for https
        sameSite: (process.env.COOKIE_SAME_SITE?.toLowerCase() || 'none') as 'none' | 'lax' | 'strict',
        domain: process.env.COOKIES_DOMAIN,
        path: '/',
      }

      const atExpiry = this.parseDuration(process.env.ACCESS_TOKEN_EXPIRY || '15m');
      const rtExpiry = this.parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');

      res.cookie('bsw_access_token', access_token, {
        ...cookieOptions,
        maxAge: atExpiry,
      });

      res.cookie('bsw_refresh_token', refresh_token, {
        ...cookieOptions,
        maxAge: rtExpiry,
      });

      return {
        success: true,
        message: 'Login successful',
        user
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handlePrismaError(error, 'login');
      throw new InternalServerErrorException('An unexpected error occurred during login');
    }
  }

  @Post('logout')
  logout(@Req() req: any, @Res() res: any) {
    try {
      res.clearCookie('bsw_access_token', { path: '/' });
      res.clearCookie('bsw_refresh_token', { path: '/' });
      return res.json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred during logout');
    }
  }

  @Post('request-password-reset')
  requestReset(@Body() dto: RequestResetDto) {
    try {
      return this.authService.requestPasswordReset(dto.email);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handlePrismaError(error, 'password reset request');
      throw new InternalServerErrorException('An unexpected error occurred during password reset request');
    }
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto,@Query('token') token: string) {
    try {
      if(!token){
        throw new UnauthorizedException('Reset token is required');
      }
      
      return this.authService.resetPassword(token, dto.newPassword);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.handlePrismaError(error, 'password reset');
      throw new InternalServerErrorException('An unexpected error occurred during password reset'); 
    }
  }
}

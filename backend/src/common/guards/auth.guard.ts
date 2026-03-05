import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import path from 'path';
import { AuthService } from 'src/auth/auth.service';

import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.cookies?.bsw_access_token;
    const refreshToken = request.cookies?.bsw_refresh_token;

    if (!accessToken && !refreshToken)
      throw new UnauthorizedException('Authentication required');

    let payload: any;

    // Try access token first
    if (accessToken) {
      try {
        payload = await this.jwtService.verifyAsync(accessToken, {
          secret: process.env.SECRET_KEY,
        });
      } catch {
        payload = null;
      }
    }

    // Fallback to refresh token
    if (!payload && refreshToken) {
      const refreshed = await this.authService.refreshTokens(refreshToken);
      if (!refreshed) throw new UnauthorizedException('Invalid or expired refresh token');
      const newAccessToken = refreshed.accessToken;
      const newRefreshToken = refreshed.refreshToken;
      
      // Set new tokens in cookies
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'PRODUCTION',
            domain: process.env.COOKIES_DOMAIN || 'bsw.iitd.ac.in',
            path: '/',
        };
        request.res.cookie('bsw_access_token', newAccessToken , {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        request.res.cookie('bsw_refresh_token', newRefreshToken , {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }

    if (!payload) throw new UnauthorizedException('Invalid or expired token');

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) throw new UnauthorizedException('User not found');

    request.user = user;
    request.role = user.role;


    return true;
  }
}
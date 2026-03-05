import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { BSWEmailTemplates } from 'src/mail/templates/email.templates';
import { OnboardDto, SignupDto } from './auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

    private signOnboardToken(email: string) {
    return this.jwtService.sign(
      { sub: email, type: 'onboard' },
      { expiresIn: '10m' },
    );
  }

  private signResetToken(email: string) {
  return this.jwtService.sign(
    { sub: email, type: 'reset'},
    {expiresIn: '10m'},
    );
  }

  private signAccessToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id, role: user.role, type: 'access',portal:'main-website' },
      { expiresIn: '30m' },
    );
  }

  private signRefreshToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id, type: 'refresh',portal:'main-website' },
      { expiresIn: '30d' },
    );
  }

  public async refreshTokens(refreshToken: string) {
    let payload: any;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const newAccessToken = this.signAccessToken(user);
    const newRefreshToken = this.signRefreshToken(user);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken, user };
  }

  async getUserForPortal(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isOnboarded: true,
        bio: true,
        avatar: true,
        program: true,
        hostel: true,
        isEmailVerified: true,
        kerberosId: true,
        personalEmail: true,
        // Added missing fields from your schema
        gender: true,
        phoneNumber: true,
        department: true,
        yearOfStudy: true,
        createdAt: true,
        updatedAt: true,
        isExternal: true
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isOnboarded) {
      throw new UnauthorizedException('User has not completed onboarding');
    }

    return user;
  }

  async signup(data: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email:data.email },
    });

    if (existing && existing.isOnboarded) {
      throw new BadRequestException(
        'User already exists. Please login.',
      );
    }

    const onboard_token = this.signOnboardToken(data.email);

    const tokenObj = await this.prisma.onboardingToken.upsert({
      where: { email: data.email },
      update: { tokenHash: onboard_token, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
      create: {
        email: data.email,
        tokenHash: onboard_token,
        dob: new Date(data.dob),
        name: data.name,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await this.mailService.sendMail(data.email, "Email Verification", BSWEmailTemplates.getVerificationEmail(data.name, onboard_token));
    return true;
  }

  async verifyToken(token: string) {
    const record = await this.prisma.onboardingToken.findUnique({
      where: { tokenHash: token },
    });

    if (!record || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return {
      email: record.email,
      name: record.name,
      dob: record.dob,
      phoneNumber: record.phoneNumber,
      gender: record.gender
    };
  }

  async onboard(onboard_token: string, dto: OnboardDto)
  {
    let payload: any;

    try {
      payload = this.jwtService.verify(onboard_token);
    } catch {
      throw new UnauthorizedException('Invalid or expired onboard token');
    }

    if (payload.type !== 'onboard') {
      throw new UnauthorizedException('Invalid token');
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      10,
    );

    const tokenObject = await this.prisma.onboardingToken.findUnique({
      where: { tokenHash: onboard_token },
    });

    if (!tokenObject) {
      throw new UnauthorizedException('Invalid onboard token');
    }

    const user = await this.prisma.user.upsert({
      where: { email: payload.sub },
      update: {
        password: hashedPassword,
        isEmailVerified: true,
        bio: dto.bio,
        isOnboarded:true,
        isExternal:true,
        avatar: dto.avatar ? dto.avatar.toString() : null,
      },
      create: {
        email: payload.sub,
        name: tokenObject.name,
        dob: tokenObject.dob,
        phoneNumber: tokenObject.phoneNumber,
        gender: tokenObject.gender,
        password: hashedPassword,
        isExternal:true,
        isOnboarded:true,
        personalEmail:payload.sub,
        bio: dto?.bio || "",
        avatar: dto.avatar ? dto.avatar.toString() : null,
      },
    }); 

    const access_token = this.signAccessToken(user);
    const refresh_token = this.signRefreshToken(user);

    await this.mailService.sendMail(user.email, "Welcome to BSW!", BSWEmailTemplates.getWelcomeEmail(user.name)); 

    return {
      message: 'Onboarding completed',
      user: user,
      access_token,
      refresh_token
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    if(!user.isExternal) {
      throw new UnauthorizedException(
        'Please login with your SSO account',
      );
    }

    if(!user.isOnboarded) {
      throw new UnauthorizedException(
        'Email not verified. Please check your inbox.',
      );
    }

    const match = await bcrypt.compare(
      password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const access_token = this.signAccessToken(user);
    const refresh_token = this.signRefreshToken(user);

    return {
      access_token,
      refresh_token,
      user
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
      throw new BadRequestException("No Account associated with this email");
    }

    const token = this.signResetToken(email);

    await this.mailService.sendMail(email, "Password Reset Request", BSWEmailTemplates.getResetPasswordEmail(user.name, token));

    return {
        message:
        'If this email exists, a reset link has been sent.',
    };
  }

   async resetPassword(token: string, newPassword: string,)
   {
    let payload: any;

    try {
        payload = this.jwtService.verify(token);
    } catch {
        throw new UnauthorizedException(
        'Invalid or expired reset token',
        );
    }

    if (payload.type !== 'reset') {
        throw new UnauthorizedException(
        'Invalid token type',
        );
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    const user = await this.prisma.user.update({
        where: { email: payload.sub },
        data: { password: hashed },
    });

    await this.mailService.sendMail(payload.sub, "Password Reset Successful", BSWEmailTemplates.getPasswordChangedEmail(user.name));
    return {
        message: 'Password reset successful',
    };
  }
}

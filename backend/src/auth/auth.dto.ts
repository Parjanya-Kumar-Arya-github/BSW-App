import { Gender } from "@prisma/client";
import { IsDateString, IsEmail, IsEnum, IsMongoId, IsNumber, IsOptional, IsPhoneNumber, IsString, Max, Min } from "class-validator";

export class SignupDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsDateString()
  dob: string;

  @IsString()
  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsEnum(Gender)
  gender: Gender;
}

export class VerifyOtpDto {
  email: string;
  otp: string;
}

export class OnboardDto {
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  bio?: string;
  
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  avatar?: string;
}

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class RequestResetDto {
  @IsEmail()
  @IsString()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  newPassword: string;
}

export class UserForPortalDto {
  @IsString()
  @IsMongoId()
  id:string;
}
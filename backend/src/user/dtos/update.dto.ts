import { IsEnum, IsOptional, IsString, IsDateString, Matches, IsPhoneNumber, IsMongoId } from 'class-validator';
import { Gender, Hostel } from '@prisma/client';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsEnum(Hostel)
  hostel?: Hostel;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('IN')
  phoneNumber?: string;
}

export class mongoIdDto {
  @IsString()
  @IsMongoId()
  id:string;
}
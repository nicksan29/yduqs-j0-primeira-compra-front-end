import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  graduationYear: string;

  @IsBoolean()
  terms: boolean;

  @IsBoolean()
  whatsapp: boolean;

  @IsString()
  @IsOptional()
  offerId?: string;
}

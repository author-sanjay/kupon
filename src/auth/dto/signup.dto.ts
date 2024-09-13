import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  middleName: string;

  @IsBoolean()
  @IsNotEmpty()
  isCompany: boolean;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
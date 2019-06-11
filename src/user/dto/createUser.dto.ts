import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';

import { Genders } from '../../shared/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  readonly city: string;

  @IsEnum(Genders, { message: 'Значение может быть "мужчина" или "женщина" ' })
  readonly gender: Genders;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(5)
  @IsNotEmpty()
  readonly password: string;
}

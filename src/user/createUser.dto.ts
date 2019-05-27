import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum Sex {
  'мужчина',
  'женщина',
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsNotEmpty()
  readonly city: string;

  @IsEnum(Sex)
  @IsNotEmpty()
  readonly sex: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(5)
  @IsNotEmpty()
  readonly password: string;
}

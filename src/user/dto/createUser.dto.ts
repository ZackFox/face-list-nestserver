import {
  IsNotEmpty,
  IsNumber,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { Genders } from '../../shared/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastname: string;

  @IsNumber()
  @ApiModelProperty()
  readonly age: number;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly city: string;

  @IsEnum(Genders, { message: 'Значение может быть "мужчина" или "женщина" ' })
  @ApiModelProperty({ enum: ['мужчина', 'женщина'] })
  readonly gender: Genders;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}

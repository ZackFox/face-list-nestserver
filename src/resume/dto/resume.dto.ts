import {
  IsNotEmpty,
  IsNumber,
  ValidateNested,
  IsEnum,
  IsEmail,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { EducationDto } from './education.dto';
import { ExperienceDto } from './experience.dto';

import { Genders } from '../../shared/gender.enum';

export class ResumeDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;

  @IsNumber()
  @ApiModelProperty()
  readonly owner: number;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastname: string;

  @IsEnum(Genders, { message: 'Значение "мужчина" или "женщина"' })
  @ApiModelProperty({ enum: ['мужчина', 'женщина'] })
  readonly gender: Genders;

  @IsNumber()
  @Min(14)
  @ApiModelProperty()
  readonly age: number;

  @ApiModelProperty()
  readonly photo: string | null;

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  readonly city: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly phone: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly position: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly salary: number;

  @ApiModelProperty()
  readonly about: string;

  @ApiModelProperty({ type: [EducationDto] })
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  readonly education: EducationDto[];

  @ApiModelProperty({ type: [ExperienceDto] })
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  readonly experience: ExperienceDto[];
}

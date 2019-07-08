import {
  IsNotEmpty,
  IsNumber,
  ValidateNested,
  IsEnum,
  IsEmail,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { EducationDto } from './education.dto';
import { ExperienceDto } from './experience.dto';

import { Genders } from '../../shared/gender.enum';

export class ResumeDto {
  @IsNumber()
  @ApiModelProperty()
  readonly owner: number;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly position: string;

  @IsNumber()
  @Min(14)
  @ApiModelProperty()
  readonly age: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly city: string;

  @ApiModelProperty()
  readonly phone: string;

  @ApiModelProperty()
  readonly photo: string;

  @IsEnum(Genders, { message: 'Значение может быть "мужчина" или "женщина" ' })
  @ApiModelProperty({ enum: ['мужчина', 'женщина'] })
  readonly gender: Genders;

  @ApiModelProperty({ type: [EducationDto] })
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  readonly education: EducationDto[];

  @ApiModelProperty({ type: [ExperienceDto] })
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  readonly experience: ExperienceDto[];
}

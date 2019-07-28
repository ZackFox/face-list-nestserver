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

  @IsNumber()
  @Min(14)
  @ApiModelProperty()
  readonly age: number;

  @ApiModelProperty()
  readonly photo: string | null;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly city: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly phone: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly position: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly salary: number;

  @IsEnum(Genders, { message: 'Значение "мужчина" или "женщина"' })
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

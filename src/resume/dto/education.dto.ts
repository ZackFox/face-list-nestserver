import { IsDateString, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EducationDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly speciality: string;

  @IsDateString()
  @ApiModelProperty()
  readonly dateStart: string;

  @IsDateString()
  @ApiModelProperty()
  readonly dateEnd: string;
}

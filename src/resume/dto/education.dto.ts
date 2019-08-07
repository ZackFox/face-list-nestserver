import { IsDateString, IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EducationDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;
  
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

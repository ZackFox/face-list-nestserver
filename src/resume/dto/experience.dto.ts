import { IsDateString, IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ExperienceDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;
  
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly position: string;

  @IsString()
  @ApiModelProperty()
  readonly description: string;

  @IsDateString()
  @ApiModelProperty()
  readonly dateStart: string;

  @ApiModelProperty()
  readonly dateEnd: string | null;
}

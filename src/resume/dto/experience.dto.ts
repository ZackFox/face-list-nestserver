import { IsDateString, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ExperienceDto {
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

  @IsDateString()
  @ApiModelProperty()
  readonly dateEnd: string;
}

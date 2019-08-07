import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastname: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly city: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @MinLength(5)
  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}

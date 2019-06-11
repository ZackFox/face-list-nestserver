import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail({}, { message: 'Не верный формат' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @ApiModelProperty()
  readonly email: string;

  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @ApiModelProperty()
  readonly password: string;
}

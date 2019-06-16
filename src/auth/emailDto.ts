import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class EmailDto {
  @IsEmail({}, { message: 'Не верный формат' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @ApiModelProperty()
  readonly email: string;
}

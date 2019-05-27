import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Не верный формат' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  readonly email: string;

  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  readonly password: string;
}

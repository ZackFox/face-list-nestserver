import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public findUserByEmail(email: string) {
    return this.userService.findUser(email);
  }

  public async register(userDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, userDto);
    return this.userService.createUser(user);
  }

  public createToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  }

  public getUser(token: string) {
    const user: any = this.jwtService.decode(token);
    return this.findUserByEmail(user.email);
  }

  public async validateUser(credentials: LoginUserDto): Promise<User> {
    const user = await this.findUserByEmail(credentials.email);
    const isValid = await user.comparePassword(credentials.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }
}

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

  public createToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  }

  public async login(credentials: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserWithRelations(credentials.email);
    const isValid = await user.comparePassword(credentials.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }

  public async register(userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(plainToClass(User, userDto));
  }

  public checkEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }

  public getUser(email: string) {
    return this.userService.getUserWithRelations(email);
  }

  public getUserByToken(token: string) {
    const user: any = this.jwtService.decode(token);
    return this.userService.getUserWithRelations(user.email);
  }
}

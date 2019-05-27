import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { LoginUserDto } from '../user/loginUser.dto';
import { CreateUserDto } from '../user/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(userData: CreateUserDto): Promise<any> {
    const user = new User(userData);
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

  public async validateUser(credentials: LoginUserDto): Promise<User> {
    const user = await this.userService.findUser(credentials.email);
    const isValid = await user.comparePassword(credentials.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }
}

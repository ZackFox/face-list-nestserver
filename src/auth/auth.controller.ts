import {
  Controller,
  Post,
  Body,
  Response,
  UsePipes,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/createUser.dto';
import { LoginUserDto } from '../user/loginUser.dto';
import { ValidationPipe } from '../validation.pipe';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signIn(@Response() res, @Body() credentials: LoginUserDto) {
    const user: User = await this.authService.validateUser(credentials);

    if (!user) {
      return res.status(403).json({
        statusCode: 403,
        error: 'Forbidden',
        message: 'User NOT found',
      });
    }

    const accessToken = this.authService.createToken(user);
    return res.status(200).json({ statusCode: 200, accessToken });
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  test(@Response() res) {
    res.send('auth route');
  }
}

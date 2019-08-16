import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { classToPlain } from 'class-transformer';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { User } from '../user/user.entity';
import { EmailDto } from './emailDto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ title: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Authentication has been successfull.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async signIn(@Res() res, @Body() credentials: LoginUserDto) {
    const user: User = await this.authService.login(credentials);

    if (!user) {
      return res.status(403).json({
        statusCode: 403,
        error: 'Forbidden',
        message: 'User NOT found',
      });
    }

    const accessToken = this.authService.createToken(user);
    return res
      .status(200)
      .json({ statusCode: 200, accessToken, user: classToPlain(user) });
  }

  @Post('signup')
  @ApiOperation({ title: 'Registration' })
  @ApiResponse({
    status: 200,
    description: 'Regisration has been successfull.',
  })
  @ApiResponse({
    status: 403,
    description: 'Current email is used already.',
  })
  async signUp(@Res() res, @Body() userDto: CreateUserDto) {
    const user = await this.authService.checkEmail(userDto.email);

    if (user) {
      return res
        .status(403)
        .json({ statusCode: '403', message: 'Current email is used already' });
    }

    await this.authService.register(userDto);
    const newUser = await this.authService.getUser(userDto.email);
    const accessToken = this.authService.createToken(newUser);
    return res
      .status(200)
      .json({ statusCode: '200', accessToken, user: classToPlain(newUser) });
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get user data' })
  @ApiResponse({
    status: 200,
    description: 'User data has been received.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Headers('authorization') authHeader, @Res() res) {
    const token = authHeader.split(' ')[1];
    const user = await this.authService.getUserByToken(token);
    return res
      .status(200)
      .json({ statusCode: '200', user: classToPlain(user) });
  }

  @Post('email')
  @ApiOperation({ title: 'check existance of email' })
  @ApiResponse({
    status: 201,
    description: 'Email is used already',
  })
  @ApiResponse({
    status: 200,
    description: 'Email is not used',
  })
  async checkEmail(@Res() res, @Body() body: EmailDto) {
    const user = await this.authService.checkEmail(body.email);
    if (user) {
      return res.status(201).json({
        statusCode: '201',
        isUsed: true,
        message: 'Email is used already',
      });
    }
    return res
      .status(200)
      .json({ statusCode: '200', isUsed: false, message: 'Email is not used' });
  }
}

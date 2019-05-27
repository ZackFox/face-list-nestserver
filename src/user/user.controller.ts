import { Controller, Post, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('login')
  signIn() {
    return 'user login';
  }

  @Post('create')
  signUp() {
    return 'create user';
  }

  @Delete(':id')
  deleteOne() {
    return 'delete user';
  }
}

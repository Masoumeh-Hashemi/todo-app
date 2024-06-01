// presentation/user/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../../../application/user/services/user.service';
import { RegisterUserCommand } from '../../../application/user/commands/register-user.command';
import { User } from '../../../domain/user/entities/user.entity';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() command: RegisterUserCommand,
  ): Promise<ResponseWrapper<User>> {
    return this.userService.registerUser(command);
  }

  @Get(':id')
  async getUserById(
    @Param('id') userId: string,
  ): Promise<ResponseWrapper<User>> {
    return this.userService.getUserById(userId);
  }
}

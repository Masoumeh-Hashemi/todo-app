// application/user/services/user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/user/repositories/user.repository';
import { User } from 'src/domain/user/entities/user.entity';
import { RegisterUserCommand } from 'src/application/user/commands/register-user.command';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/domain/user/events/user-registered.event';
import { GetUserQuery } from 'src/application/user/queries/get-user.query';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async registerUser(
    command: RegisterUserCommand,
  ): Promise<ResponseWrapper<User>> {
    const { username, password } = command;
    const newUser = new User(Date.now().toString(), username, password, []);
    const createdUser = await this.userRepository.create(newUser);
    this.eventBus.publish(
      new UserRegisteredEvent(createdUser.id, createdUser.username),
    );
    return new ResponseWrapper<User>(
      true,
      'User registered successfully',
      createdUser,
    );
  }

  async getUserById(userId: string): Promise<ResponseWrapper<User>> {
    const query = new GetUserQuery(userId);
    const user = await this.queryBus.execute<GetUserQuery, User>(query);
    return new ResponseWrapper<User>(true, 'User retrieved successfully', user);
  }

  async removeTodoListFromUser(
    userId: string,
    listId: string,
  ): Promise<ResponseWrapper<void>> {
    await this.userRepository.removeTodoList(userId, listId);
    return new ResponseWrapper<void>(
      true,
      'Todo list removed from user successfully',
    );
  }
}

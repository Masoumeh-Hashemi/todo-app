import { EventBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domain/user/entities/user.entity';
import { UserRegisteredEvent } from 'src/domain/user/events/user-registered.event';
import { IUserRepository } from 'src/domain/user/repositories/user.repository';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';
import { RegisterUserCommand } from '../../commands/register-user.command';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: IUserRepository;
  let eventBus: EventBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            removeTodoList: jest.fn(),
          },
        },
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>('UserRepository');
    eventBus = module.get<EventBus>(EventBus);
  });

  it('should register a user and publish an event', async () => {
    const command = new RegisterUserCommand('username', 'password');
    const user = new User('1', 'username', 'password', []);

    jest.spyOn(userRepository, 'create').mockResolvedValue(user);

    const result = await service.registerUser(command);

    expect(result).toEqual(
      new ResponseWrapper<User>(true, 'User registered successfully', user),
    );
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(eventBus.publish).toHaveBeenCalledWith(
      expect.any(UserRegisteredEvent),
    );
  });
});

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../queries/get-user.query';
import { User } from '../../../domain/user/entities/user.entity';
import { IUserRepository } from 'src/domain/user/repositories/user.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, User> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<User> {
    const { userId } = query;
    return await this.userRepository.findById(userId);
  }
}

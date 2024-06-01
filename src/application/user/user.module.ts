import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRegisteredEventHandler } from './event-handlers/user.event-handlers';
import { UserSagas } from './sagas/user.saga';

import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserHandler } from './query-handlers/get-user.handler';
import { RemoveTodoListFromUserHandler } from './command-handlers/remove-todo-list-from-user.handler';

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [
    UserService,
    UserRegisteredEventHandler,
    UserSagas,
    GetUserHandler,
    RemoveTodoListFromUserHandler,
  ],
  exports: [UserService],
  // exports: [UserService, UserRegisteredEventHandler, UserSagas],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../presentation/controllers/user/user.controller';
import { TodoListController } from '../presentation/controllers/todo/todoList.controller';
import { TodoItemController } from '../presentation/controllers/todo/todoItem.controller';
import { UserService } from './user/services/user.service';
import { TodoListService } from './todo/services/todo-list.service';
import { TodoItemService } from './todo/services/todo-item.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRegisteredEventHandler } from './user/event-handlers/user.event-handlers';
import { TodoListCreatedEventHandler } from './todo/event-handlers/todo-list.event-handlers';
import { UserSagas } from './user/sagas/user.saga';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import * as mongoose from 'mongoose';
import { CreateTodoListHandler } from './todo/command-handlers/create-todo-list.handler';
import { GetUserHandler } from './user/query-handlers/get-user.handler';
import { TodoSagas } from './todo/sagas/todo.saga';
import { RemoveTodoListFromUserHandler } from './user/command-handlers/remove-todo-list-from-user.handler';
import { DeleteTodoItemsByListIdHandler } from './todo/command-handlers/delete-todo-items-by-list-id.handler';
import { GetTodoListHandler } from './todo/query-handlers/get-todo-list.handler';

mongoose.set('debug', true);
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo-app'),
    CqrsModule,
    InfrastructureModule,
  ],
  controllers: [UserController, TodoListController, TodoItemController],
  providers: [
    UserService,
    TodoListService,
    TodoItemService,
    CreateTodoListHandler,
    UserRegisteredEventHandler,
    TodoListCreatedEventHandler,
    UserSagas,
    TodoSagas,
    GetUserHandler,
    RemoveTodoListFromUserHandler,
    DeleteTodoItemsByListIdHandler,
    GetTodoListHandler,
  ],
  exports: [],
})
export class AppModule {}

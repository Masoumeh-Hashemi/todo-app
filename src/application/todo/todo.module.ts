import { Module } from '@nestjs/common';
import { TodoListService } from './services/todo-list.service';
import { TodoItemService } from './services/todo-item.service';
import { TodoListCreatedEventHandler } from './event-handlers/todo-list.event-handlers';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { TodoListDeletedEvent } from 'src/domain/todo/events/todo-list-deleted.event';
import { DeleteTodoListHandler } from './command-handlers/delete-todo-list.handler';
import { DeleteTodoItemsByListIdCommand } from './commands/delete-todo-items-by-list-id.command';
import { GetTodoListQuery } from './queries/get-todo-list.query';
import { GetTodoListHandler } from './query-handlers/get-todo-list.handler';

@Module({
  imports: [DatabaseModule],
  providers: [
    TodoListService,
    TodoItemService,
    TodoListCreatedEventHandler,
    DeleteTodoListHandler,
    DeleteTodoItemsByListIdCommand,
    GetTodoListHandler,
    GetTodoListQuery,
  ],
  exports: [
    TodoListService,
    TodoItemService,
    TodoListCreatedEventHandler,
    TodoListDeletedEvent,
  ],
})
export class TodoModule {}

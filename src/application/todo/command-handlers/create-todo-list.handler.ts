// application/todo/handlers/create-todo-list.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { TodoListService } from '../services/todo-list.service';
import { TodoList } from '../../../domain/todo/entities/todoList.entity';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListService: TodoListService) {}

  async execute(
    command: CreateTodoListCommand,
  ): Promise<ResponseWrapper<TodoList>> {
    return this.todoListService.createTodoList(command);
  }
}

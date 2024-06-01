import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListService } from '../services/todo-list.service';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private readonly todoListService: TodoListService) {}

  async execute(command: DeleteTodoListCommand): Promise<void> {
    await this.todoListService.deleteTodoList(command);
  }
}

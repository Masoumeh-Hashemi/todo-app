import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoItemRepository } from 'src/domain/todo/repositories/todoItem.repository';
import { DeleteTodoItemsByListIdCommand } from '../commands/delete-todo-items-by-list-id.command';

@CommandHandler(DeleteTodoItemsByListIdCommand)
export class DeleteTodoItemsByListIdHandler
  implements ICommandHandler<DeleteTodoItemsByListIdCommand>
{
  constructor(
    @Inject('TodoItemRepository')
    private readonly todoItemRepository: ITodoItemRepository,
  ) {}

  async execute(command: DeleteTodoItemsByListIdCommand): Promise<void> {
    const { listId } = command;
    await this.todoItemRepository.deleteByListId(listId);
  }
}

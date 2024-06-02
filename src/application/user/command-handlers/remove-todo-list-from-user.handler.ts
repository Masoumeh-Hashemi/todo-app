import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveTodoListFromUserCommand } from '../commands/remove-todo-list-from-user.command';
import { UserService } from '../services/user.service';

@CommandHandler(RemoveTodoListFromUserCommand)
export class RemoveTodoListFromUserHandler
  implements ICommandHandler<RemoveTodoListFromUserCommand>
{
  constructor(private readonly userService: UserService) {}

  async execute(command: RemoveTodoListFromUserCommand): Promise<void> {
    const { userId, listId } = command;
    await this.userService.removeTodoListFromUser(userId, listId);
  }
}

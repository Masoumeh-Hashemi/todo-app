import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoListDeletedEvent } from 'src/domain/todo/events/todo-list-deleted.event';
import { UserRegisteredEvent } from '../../../domain/user/events/user-registered.event';
import { CreateTodoListCommand } from '../../todo/commands/create-todo-list.command';
import { RemoveTodoListFromUserCommand } from '../commands/remove-todo-list-from-user.command';

@Injectable()
export class UserSagas {
  @Saga()
  userRegistered = (
    events$: Observable<any>,
  ): Observable<CreateTodoListCommand> => {
    return events$.pipe(
      ofType(UserRegisteredEvent),
      map(
        (event) => new CreateTodoListCommand(event.userId, 'Default Todo List'),
      ),
    );
  };

  @Saga()
  todoListDeleted = (
    events$: Observable<any>,
  ): Observable<RemoveTodoListFromUserCommand> => {
    return events$.pipe(
      ofType(TodoListDeletedEvent),
      map(
        (event) =>
          new RemoveTodoListFromUserCommand(event.userId, event.listId),
      ),
    );
  };
}

import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoListDeletedEvent } from 'src/domain/todo/events/todo-list-deleted.event';
import { DeleteTodoItemsByListIdCommand } from '../commands/delete-todo-items-by-list-id.command';

@Injectable()
export class TodoSagas {
  @Saga()
  todoListDeleted = (
    events$: Observable<any>,
  ): Observable<DeleteTodoItemsByListIdCommand> => {
    return events$.pipe(
      ofType(TodoListDeletedEvent),
      map((event) => new DeleteTodoItemsByListIdCommand(event.listId)),
    );
  };
}

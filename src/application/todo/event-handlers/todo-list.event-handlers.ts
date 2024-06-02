import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoListCreatedEvent } from '../../../domain/todo/events/todo-list-created.event';

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  handle(event: TodoListCreatedEvent) {
    console.log(`Todo list created: ${event.title}`);
  }
}

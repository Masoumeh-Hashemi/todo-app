import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../../../domain/user/events/user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredEventHandler
  implements IEventHandler<UserRegisteredEvent>
{
  handle(event: UserRegisteredEvent) {
    //Can be used for any further notification or email
    console.log(`User registered: ${event.username}`);
  }
}

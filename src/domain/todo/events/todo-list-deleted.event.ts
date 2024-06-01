export class TodoListDeletedEvent {
  constructor(public readonly listId: string, public readonly userId: string) {}
}

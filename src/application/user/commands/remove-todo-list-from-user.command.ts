export class RemoveTodoListFromUserCommand {
  constructor(public readonly userId: string, public readonly listId: string) {}
}

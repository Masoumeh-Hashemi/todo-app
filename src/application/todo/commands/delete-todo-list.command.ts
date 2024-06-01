export class DeleteTodoListCommand {
  constructor(public readonly listId: string, public readonly userId: string) {}
}

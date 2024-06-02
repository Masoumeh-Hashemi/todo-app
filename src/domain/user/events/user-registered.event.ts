export class UserRegisteredEvent {
  constructor(
    public readonly userId: string,
    public readonly username: string,
  ) {}
}

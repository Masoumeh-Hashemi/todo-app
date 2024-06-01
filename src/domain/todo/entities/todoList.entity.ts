export class TodoList {
  constructor(
    public userId: string,
    public title: string,
    public items: string[] = [],
    public createdAt: Date = new Date(),
    public id?: string,
  ) {}
}

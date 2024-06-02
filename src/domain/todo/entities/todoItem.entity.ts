export class TodoItem {
  constructor(
    public id: string,
    public listId: string,
    public title: string,
    public description: string,
    public priority: number,
    public completed: boolean = false,
    public createdAt: Date = new Date(),
  ) {}
}

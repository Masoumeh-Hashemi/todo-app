export class TodoItem {
  constructor(
    public id: string,
    public listId: string,
    public title: string,
    public description: string,
    public priority: number,
    public completed: boolean = false, // Include a field to track completion status
    public createdAt: Date = new Date(), // Include a field to track creation timestamp
  ) {}
}

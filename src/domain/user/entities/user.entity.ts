// domain/user/entities/user.entity.ts
import { TodoList } from '../../todo/entities/todoList.entity';

export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public todoLists: TodoList[] = [],
    public createdAt: Date = new Date(), // Include a field to track creation timestamp
  ) {}
}

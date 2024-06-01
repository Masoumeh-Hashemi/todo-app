// domain/todo/repositories/todo-list.repository.ts
import { TodoList } from '../entities/todoList.entity';

export interface ITodoListRepository {
  create(todoList: TodoList): Promise<TodoList>;
  update(todoList: TodoList): Promise<TodoList>;
  findById(id: string): Promise<TodoList | null>;
  deleteById(id: string): Promise<void>;
}

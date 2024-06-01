// domain/todo/repositories/todo-item.repository.ts
import { TodoItem } from '../entities/todoItem.entity';

export interface ITodoItemRepository {
  create(todoItem: TodoItem): Promise<TodoItem>;
  update(todoItem: TodoItem): Promise<TodoItem>;
  findById(id: string): Promise<TodoItem | null>;
  deleteById(id: string): Promise<void>;
  deleteByListId(id: string): Promise<void>;
}

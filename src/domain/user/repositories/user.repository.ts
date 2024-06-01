// domain/user/repositories/user.repository.ts
import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  deleteById(id: string): Promise<void>;
  removeTodoList(userId: string, listId: string): Promise<void>;
}

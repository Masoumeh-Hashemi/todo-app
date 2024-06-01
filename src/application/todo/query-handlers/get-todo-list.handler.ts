import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoListQuery } from '../queries/get-todo-list.query';
import { TodoList } from '../../../domain/todo/entities/todoList.entity';
import { Inject } from '@nestjs/common';
import { TodoListMongoRepository } from 'src/infrastructure/database/repositories/todoList.repository.mongo';

@QueryHandler(GetTodoListQuery)
export class GetTodoListHandler
  implements IQueryHandler<GetTodoListQuery, TodoList | null>
{
  constructor(
    @Inject('TodoListRepository')
    private readonly todoListRepository: TodoListMongoRepository,
  ) {}

  async execute(query: GetTodoListQuery): Promise<TodoList | null> {
    const { listId } = query;
    return this.todoListRepository.findAllItemsByListId(listId);
  }
}

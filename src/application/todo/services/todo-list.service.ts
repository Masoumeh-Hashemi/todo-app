import { Inject, Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../../../domain/todo/repositories/todoList.repository';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { UpdateTodoListCommand } from '../commands/update-todo-list.command';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';
import { TodoList } from '../../../domain/todo/entities/todoList.entity';
import { EventBus } from '@nestjs/cqrs';
import { TodoListDeletedEvent } from 'src/domain/todo/events/todo-list-deleted.event';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Injectable()
export class TodoListService {
  constructor(
    @Inject('TodoListRepository')
    private readonly todoListRepository: ITodoListRepository,
    private readonly eventBus: EventBus,
  ) {}

  async createTodoList(
    command: CreateTodoListCommand,
  ): Promise<ResponseWrapper<TodoList>> {
    const { userId, title } = command;
    const newTodoList = new TodoList(userId, title);
    const insertedTodoList = await this.todoListRepository.create(newTodoList);
    const todoList = await this.todoListRepository.findById(
      insertedTodoList.id,
    );

    return new ResponseWrapper<TodoList>(
      true,
      'Todo list created successfully',
      todoList,
    );
  }

  async updateTodoList(
    command: UpdateTodoListCommand,
  ): Promise<ResponseWrapper<TodoList>> {
    const { id, title } = command;
    const todoList = await this.todoListRepository.findById(id);
    if (!todoList) {
      throw new Error('TodoList not found');
    }
    todoList.title = title;
    const updatedTodoList = await this.todoListRepository.update(todoList);
    return new ResponseWrapper<TodoList>(
      true,
      'Todo list updated successfully',
      updatedTodoList,
    );
  }

  async deleteTodoList(
    command: DeleteTodoListCommand,
  ): Promise<ResponseWrapper<void>> {
    const { listId, userId } = command;
    this.eventBus.publish(new TodoListDeletedEvent(listId, userId));
    this.todoListRepository.deleteById(listId);
    return new ResponseWrapper<void>(true, 'Todo list deleted successfully');
  }
}

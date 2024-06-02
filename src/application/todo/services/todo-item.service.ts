import { Inject, Injectable } from '@nestjs/common';
import { ITodoItemRepository } from '../../../domain/todo/repositories/todoItem.repository';
import { ITodoListRepository } from '../../../domain/todo/repositories/todoList.repository';
import { CreateTodoItemCommand } from '../commands/create-todo-item.command';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { TodoItem } from '../../../domain/todo/entities/todoItem.entity';
import { v4 as uuidv4 } from 'uuid';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Injectable()
export class TodoItemService {
  constructor(
    @Inject('TodoItemRepository')
    private readonly todoItemRepository: ITodoItemRepository,
    @Inject('TodoListRepository')
    private readonly todoListRepository: ITodoListRepository,
  ) {}

  async createTodoItem(
    command: CreateTodoItemCommand,
  ): Promise<ResponseWrapper<TodoItem>> {
    const { todoListId, title, description, priority } = command;
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) {
      throw new Error('TodoList not found');
    }
    const id = uuidv4();
    const newTodoItem = new TodoItem(
      id,
      todoList.id,
      title,
      description,
      priority,
    );

    const createdTodoItem = await this.todoItemRepository.create(newTodoItem);
    todoList.items.push(createdTodoItem.id);
    await this.todoListRepository.update(todoList);
    return new ResponseWrapper<TodoItem>(
      true,
      'Todo item created successfully',
      createdTodoItem,
    );
  }

  async updateTodoItem(
    command: UpdateTodoItemCommand,
  ): Promise<ResponseWrapper<TodoItem>> {
    const { id, title, description, priority } = command;
    const todoItem = await this.todoItemRepository.findById(id);
    if (!todoItem) {
      throw new Error('TodoItem not found');
    }
    todoItem.title = title;
    todoItem.description = description;
    todoItem.priority = priority;
    await this.todoItemRepository.update(todoItem);
    const updatedTodoItem = await this.todoItemRepository.findById(id);
    return new ResponseWrapper<TodoItem>(
      true,
      'Todo item created successfully',
      updatedTodoItem,
    );
  }

  async deleteTodoItem(
    command: DeleteTodoItemCommand,
  ): Promise<ResponseWrapper<void>> {
    const { id } = command;
    const todoItem = await this.todoItemRepository.findById(id);
    if (!todoItem) {
      throw new Error('TodoItem not found');
    }
    const todoList = await this.todoListRepository.findById(todoItem.listId);

    if (todoList) {
      todoList.items = todoList.items.filter((item) => item.toString() !== id);
      await this.todoListRepository.update(todoList);
    }
    this.todoItemRepository.deleteById(id);
    return new ResponseWrapper<void>(true, 'Todo item deleted successfully');
  }

  async deleteTodoItemsByListId(listId: string): Promise<void> {
    await this.todoItemRepository.deleteByListId(listId);
  }
}

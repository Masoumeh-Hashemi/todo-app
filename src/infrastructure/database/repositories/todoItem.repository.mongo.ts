import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoListRepository } from 'src/domain/todo/repositories/todoList.repository';
import { TodoItem } from '../../../domain/todo/entities/todoItem.entity';
import { ITodoItemRepository } from '../../../domain/todo/repositories/todoItem.repository';
import { TodoItemDocument } from '../models/todoItem.model';

@Injectable()
export class TodoItemMongoRepository implements ITodoItemRepository {
  constructor(
    @InjectModel('TodoItem')
    private readonly todoItemModel: Model<TodoItemDocument>,
    @Inject('TodoListRepository')
    private readonly todoListRepository: ITodoListRepository,
  ) {}

  async create(todoItem: TodoItem): Promise<TodoItem> {
    const createdTodoItem = new this.todoItemModel(todoItem);
    return createdTodoItem.save();
  }

  async findById(id: string): Promise<TodoItem | null> {
    return this.todoItemModel.findById(id).exec();
  }

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async update(todoItem: TodoItem): Promise<TodoItem> {
    return this.todoItemModel
      .findByIdAndUpdate(todoItem.id, todoItem, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<void> {
    const todoItem = await this.todoItemModel.findById(id).exec();
    if (todoItem) {
      await this.todoItemModel.findByIdAndDelete(id).exec();
      const todoList = await this.todoListRepository.findById(todoItem.listId);
      if (todoList) {
        todoList.items = todoList.items.filter(
          (itemId) => itemId.toString() !== id,
        );
        await this.todoListRepository.update(todoList);
      }
    }
  }

  async deleteByListId(listId: string): Promise<void> {
    await this.todoItemModel.deleteMany({ listId }).exec();
  }
}

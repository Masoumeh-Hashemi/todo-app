import { Injectable } from '@nestjs/common';
import { ITodoListRepository } from '../../../domain/todo/repositories/todoList.repository';
import { TodoList } from '../../../domain/todo/entities/todoList.entity';
import { TodoListDocument } from '../models/todoList.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../models/user.model';

@Injectable()
export class TodoListMongoRepository implements ITodoListRepository {
  constructor(
    @InjectModel('TodoList')
    private readonly todoListModel: Model<TodoListDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(todoList: TodoList): Promise<TodoList> {
    const createdTodoList = new this.todoListModel(todoList);
    createdTodoList.save();
    const user = await this.userModel.findById(todoList.userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    user.todoLists.push(createdTodoList.id);
    await user.save();

    return createdTodoList;
  }

  async update(todoList: TodoList): Promise<TodoList> {
    return this.todoListModel
      .findByIdAndUpdate(todoList.id, todoList, { new: true })
      .exec();
  }

  async findById(id: string): Promise<TodoList | null> {
    return this.todoListModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.todoListModel.findByIdAndDelete(id).exec();
  }
  async findAllItemsByListId(listId: string): Promise<TodoList | null> {
    return this.todoListModel
      .findById(listId)
      .populate({
        path: 'items',
        options: { sort: { priority: 1 } },
      })
      .exec();
  }
}

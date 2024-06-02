import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoItemService } from '../../../application/todo/services/todo-item.service';
import { CreateTodoItemCommand } from '../../../application/todo/commands/create-todo-item.command';
import { UpdateTodoItemCommand } from '../../../application/todo/commands/update-todo-item.command';
import { DeleteTodoItemCommand } from '../../../application/todo/commands/delete-todo-item.command';
import { TodoItem } from '../../../domain/todo/entities/todoItem.entity';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Controller('todo-items')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post('create')
  async createTodoItem(
    @Body() command: CreateTodoItemCommand,
  ): Promise<ResponseWrapper<TodoItem>> {
    return this.todoItemService.createTodoItem(command);
  }

  @Put('update')
  async updateTodoItem(
    @Body() command: UpdateTodoItemCommand,
  ): Promise<ResponseWrapper<TodoItem>> {
    return this.todoItemService.updateTodoItem(command);
  }

  @Delete('delete/:id')
  async deleteTodoItem(
    @Param('id') id: string,
  ): Promise<ResponseWrapper<void>> {
    return this.todoItemService.deleteTodoItem(new DeleteTodoItemCommand(id));
  }
}

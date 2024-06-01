import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { TodoListService } from '../../../application/todo/services/todo-list.service';
import { CreateTodoListCommand } from '../../../application/todo/commands/create-todo-list.command';
import { UpdateTodoListCommand } from '../../../application/todo/commands/update-todo-list.command';
import { DeleteTodoListCommand } from '../../../application/todo/commands/delete-todo-list.command';
import { TodoList } from '../../../domain/todo/entities/todoList.entity';
import { GetTodoListQuery } from 'src/application/todo/queries/get-todo-list.query';
import { QueryBus } from '@nestjs/cqrs';
import { ResponseWrapper } from 'src/shared/dto/response-wrapper.dto';

@Controller('todo-lists')
export class TodoListController {
  constructor(
    private readonly todoListService: TodoListService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async createTodoList(
    @Body() command: CreateTodoListCommand,
  ): Promise<ResponseWrapper<TodoList>> {
    return this.todoListService.createTodoList(command);
  }

  @Put('update')
  async updateTodoList(
    @Body() command: UpdateTodoListCommand,
  ): Promise<ResponseWrapper<TodoList>> {
    return this.todoListService.updateTodoList(command);
  }

  @Delete('delete')
  async deleteTodoList(
    @Body() body: { listId: string; userId: string },
  ): Promise<ResponseWrapper<void>> {
    const { listId, userId } = body;
    return this.todoListService.deleteTodoList(
      new DeleteTodoListCommand(listId, userId),
    );
  }
  @Get(':id')
  async getTodoList(
    @Param('id') listId: string,
  ): Promise<ResponseWrapper<TodoList | null>> {
    const todoList = await this.queryBus.execute(new GetTodoListQuery(listId));
    return new ResponseWrapper<TodoList | null>(
      true,
      'Todo list retrieved successfully',
      todoList,
    );
  }
}

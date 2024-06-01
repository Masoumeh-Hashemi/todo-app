// infrastructure/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemSchema } from './models/todoItem.model';
import { TodoListSchema } from './models/todoList.model';
import { UserSchema } from './models/user.model';
import { TodoItemMongoRepository } from './repositories/todoItem.repository.mongo';
import { TodoListMongoRepository } from './repositories/todoList.repository.mongo';
import { UserMongoRepository } from './repositories/user.repository.mongo';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TodoItem', schema: TodoItemSchema }]),
    MongooseModule.forFeature([{ name: 'TodoList', schema: TodoListSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    { provide: 'TodoItemRepository', useClass: TodoItemMongoRepository },
    { provide: 'TodoListRepository', useClass: TodoListMongoRepository },
    { provide: 'UserRepository', useClass: UserMongoRepository },
  ],
  exports: ['TodoItemRepository', 'TodoListRepository', 'UserRepository'],
})
export class DatabaseModule {}

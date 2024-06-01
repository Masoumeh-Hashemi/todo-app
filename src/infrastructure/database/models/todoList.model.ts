// infrastructure/database/models/todo-list.model.ts
import { Schema, model, Document } from 'mongoose';

export interface TodoListDocument extends Document {
  id: string;
  userId: string;
  title: string;
  items: string[];
  createdAt: Date;
}

export const TodoListSchema = new Schema<TodoListDocument>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'TodoItem' }],
  createdAt: { type: Date, default: Date.now },
});

export const TodoListModel = model<TodoListDocument>(
  'TodoList',
  TodoListSchema,
);

// infrastructure/database/models/todo-item.model.ts
import { Schema, model, Document } from 'mongoose';

export interface TodoItemDocument extends Document {
  id: string;
  listId: string;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
  createdAt: Date;
}

export const TodoItemSchema = new Schema<TodoItemDocument>({
  id: { type: String, required: true, unique: true }, // Ensure id mirrors _id
  listId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Sync id with _id before saving
TodoItemSchema.pre('save', function (next) {
  this.id = this._id;
  next();
});

export const TodoItemModel = model<TodoItemDocument>(
  'TodoItem',
  TodoItemSchema,
);

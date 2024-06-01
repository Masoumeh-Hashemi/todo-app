// infrastructure/database/models/user.model.ts
import { Schema, model, Document } from 'mongoose';
import { TodoListDocument } from './todoList.model';
export interface UserDocument extends Document {
  id: string;
  username: string;
  password: string;
  todoLists: TodoListDocument[];
  createdAt: Date;
}

export const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  todoLists: [{ type: Schema.Types.ObjectId, ref: 'TodoList' }],
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserDocument>('User', UserSchema);

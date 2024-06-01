// infrastructure/database/repositories/user.repository.mongo.ts
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';
import { UserDocument } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(user: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(user.id, user, { new: true })
      .exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async removeTodoList(userId: string, listId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { $pull: { todoLists: listId } })
      .exec();
  }
}

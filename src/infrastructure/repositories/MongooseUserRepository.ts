import { User } from '../../core/entities/User';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { UserModel } from '../database/schemas/UserSchema';

export class MongooseUserRepository implements IUserRepository {
  private mapToDomain(doc: any): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: doc.password,
      role: doc.role,
      createdAt: doc.createdAt
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email });
    return doc ? this.mapToDomain(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? this.mapToDomain(doc) : null;
  }

  async create(user: User): Promise<User> {
    const doc = new UserModel(user);
    await doc.save();
    return this.mapToDomain(doc);
  }
}

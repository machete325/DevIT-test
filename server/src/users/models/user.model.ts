import 'reflect-metadata';
import { BaseModel } from 'src/common/models/base.model';

export class UserModel extends BaseModel {
  email: string;

  firstName?: string;

  lastName?: string;
}

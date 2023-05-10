import { User as UserModel } from '@prisma/client';
import { User } from '../types/user.type';

export function convertToUser(model: UserModel): User {
    return {
        id: model.id,
        email: model.email,
        firstName: model.firstName,
        lastName: model.lastName,
    };
}

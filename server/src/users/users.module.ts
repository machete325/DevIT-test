import { Module } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { UserController } from './user.controller';

@Module({
    providers: [PasswordService],
    controllers: [UserController],
})
export class UsersModule { }

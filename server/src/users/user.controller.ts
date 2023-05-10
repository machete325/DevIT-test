import {
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { UserOutput } from 'src/users/dto/user.output';

@ApiTags('Users')
@Controller('api/v1/public/users')
export class UserController {
    constructor() { }

    @Get('/me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getCurrentUser(@User() user: UserOutput): Promise<UserOutput> {
        return user;
    }
}

import {
    Logger,
    Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import config from 'src/common/configs/config';
import { loggingMiddleware } from 'src/common/middleware/logging.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostModule } from './post/post.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'client', 'build'),
        }),
        ScheduleModule.forRoot(),
        AuthModule,
        PostModule,
        UsersModule,
    ],
})
export class AppModule { }

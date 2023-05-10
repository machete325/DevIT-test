import { PrismaService } from 'nestjs-prisma';
import {
    Prisma,
    User,
} from '@prisma/client';
import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { LoginInput } from './dto/login.input';
import { AuthOutput } from './dto/auth.output';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly configService: ConfigService,
    ) {}

    async signup(signupInput: SignupInput): Promise<AuthOutput> {
        const hashedPassword = await this.passwordService.hashPassword(
            signupInput.password,
        );

        try {
            const user = await this.prisma.user.create({
                data: {
                    ...signupInput,
                    password: hashedPassword,
                },
            });

            return this.generateTokens({
                userId: user.id,
            });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${signupInput.email} already used.`);
            }

            throw new Error(e);
        }
    }

    async login(loginInput: LoginInput): Promise<AuthOutput> {
        const { email, password } = loginInput;

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new BadRequestException('Account is not found or password is incorrect');
        }

        const passwordValid = await this.passwordService.validatePassword(
            password,
            user.password,
        );

        if (!passwordValid) {
            throw new BadRequestException('Account is not found or password is incorrect');
        }

        return this.generateTokens({
            userId: user.id,
        });
    }

    validateUser(userId: number): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    getUserFromToken(token: string): Promise<User> {
        const id = this.jwtService.decode(token)['userId'];

        return this.prisma.user.findUnique({ where: { id } });
    }

    generateTokens(payload: { userId: number }): AuthOutput {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    private generateAccessToken(payload: { userId: number }): string {
        return this.jwtService.sign(payload);
    }

    private generateRefreshToken(payload: { userId: number }): string {
        const securityConfig = this.configService.get<SecurityConfig>('security');

        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: securityConfig.refreshIn,
        });
    }

    refreshToken(token: string): AuthOutput {
        try {
            const { userId } = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });

            return this.generateTokens({
                userId,
            });
        } catch (e) {
            throw new BadRequestException('Refresh token is missed or not valid');
        }
    }
}

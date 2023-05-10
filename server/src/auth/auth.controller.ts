import {
    Body,
    Controller,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthOutput } from './dto/auth.output';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenInput } from './dto/refresh-token.input';

@ApiTags('Auth')
@Controller('api/v1/public/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('/login')
    login(@Body(new ValidationPipe()) loginInput: LoginInput): Promise<AuthOutput> {
        return this.authService.login(loginInput);
    }

  @Post('/signup')
  register(@Body(new ValidationPipe()) signupInput: SignupInput): Promise<AuthOutput> {
      return this.authService.signup(signupInput);
  }

  @Post('/token/refresh')
  refreshToken(@Body(new ValidationPipe()) refreshTokenInput: RefreshTokenInput): AuthOutput {
      return this.authService.refreshToken(refreshTokenInput.refreshToken);
  }
}

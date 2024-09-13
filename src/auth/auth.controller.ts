import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signin() {
    return this.authService.login();
  }

  @Post('register')
  signup() {
    return this.authService.signup();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
}

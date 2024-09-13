import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { JwtGuard } from 'src/guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtGuard)
  @Get('getUserById')
  getUserById(@Query() id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Delete('deleteUser')
  deleteUser(@Query() id: string) {
    return this.userService.deleteUser(Number(id));
  }

  @Patch("upgradeToCompany")
  upgradeToCompany(@Query() id:string) {
    return this.userService.upgradeToCompany(Number(id));
  }
}

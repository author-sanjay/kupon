import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';
import { JwtGuard } from 'src/guard';
import { UserWallet } from './dto';

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

  @UseGuards(JwtGuard)
  @Get('getUser')
  getUser(@Req() req: Request) {
    const user = req['user'];
    const userId = user.sub;
    return this.userService.getUserById(userId);
  }
  @UseGuards(JwtGuard)
  @Delete('deleteUser')
  deleteUser(@Query() id: string) {
    return this.userService.deleteUser(Number(id));
  }
  @UseGuards(JwtGuard)
  @Patch('upgradeToCompany')
  upgradeToCompany(@Query() id: string) {
    return this.userService.upgradeToCompany(Number(id));
  }

  @UseGuards(JwtGuard)
  @Patch('addWallet')
  addWallet(@Body() walletDto: UserWallet) {
    return this.userService.addWallet(walletDto);
  }
}

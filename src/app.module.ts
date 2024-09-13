import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [AuthModule, UserModule, CouponsModule],
})
export class AppModule {}

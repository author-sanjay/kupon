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
import { CouponsService } from './coupons.service';
import { JwtGuard } from 'src/guard';
import { CouponDto, CouponTransfer } from './dto';

@UseGuards(JwtGuard)
@Controller('coupons')
export class CouponsController {
  constructor(private couponService: CouponsService) {}

  @Post('addCoupon')
  createCoupon(@Body() dto: CouponDto) {
    return this.couponService.createCoupon(dto);
  }

  @Patch('updateCoupon')
  updateCoupon(@Query('id') id: string, @Body() dto: CouponDto) {
    return this.couponService.updateCoupon(Number(id), dto);
  }

  @Delete('deleteCoupon')
  deleteCoupon(@Query('id') id: string) {
    return this.couponService.deleteCoupon(Number(id));
  }

  @Get('getAllCoupons')
  getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  @Get('getCouponById')
  getSingleCoupon(@Query('id') id: string) {
    return this.couponService.getSingleCoupon(Number(id));
  }

  @Patch('transferCoupon')
  transferCoupon(@Body() couponTranferDto: CouponTransfer) {
    return this.couponService.transferCoupon(couponTranferDto);
  }
}

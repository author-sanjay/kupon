import { Controller } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller()
export class CouponsController {
  constructor(private couponService: CouponsService) {}
}

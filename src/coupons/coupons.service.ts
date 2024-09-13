import { Injectable } from '@nestjs/common';
import { CouponDto, CouponTransfer } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class CouponsService {
  constructor(private prisma: PrismaService) {}
  async createCoupon(dto: CouponDto) {
    try {
      const coupon = await this.prisma.coupon.create({
        data: {
          discount: dto.discount,
          expiry: dto.expiry,
          platform: dto.platform,
          title: dto.title,
          isUsed: dto.isUsed,
          photoUrl: dto.photoUrl,
          createdBy: dto.createdBy,
          ownedBy: dto.createdBy,
        },
      });

      return coupon;
    } catch (err) {
      throw err;
    }
  }

  async updateCoupon(id: number, dto: CouponDto) {
    try {
      const updatedCoupon = await this.prisma.coupon.update({
        where: { id },
        data: {
          discount: dto.discount,
          expiry: dto.expiry,
          platform: dto.platform,
          title: dto.title,
          isUsed: dto.isUsed,
          photoUrl: dto.photoUrl,
          description: dto.description,
        },
      });
      return updatedCoupon;
    } catch (err) {
      throw new Error(`Failed to update coupon with ID ${id}: ${err.message}`);
    }
  }

  async deleteCoupon(id: number) {
    try {
      const deletedCoupon = await this.prisma.coupon.delete({
        where: { id },
      });
      return deletedCoupon;
    } catch (err) {
      throw new Error(`Failed to delete coupon with ID ${id}: ${err.message}`);
    }
  }

  async getAllCoupons() {
    try {
      const coupons = await this.prisma.coupon.findMany();
      return coupons;
    } catch (err) {
      throw new Error(`Failed to fetch all coupons: ${err.message}`);
    }
  }

  async getSingleCoupon(id: number) {
    try {
      const coupon = await this.prisma.coupon.findUnique({
        where: { id },
      });
      if (!coupon) {
        throw new Error(`Coupon with ID ${id} not found.`);
      }
      return coupon;
    } catch (err) {
      throw new Error(`Failed to fetch coupon with ID ${id}: ${err.message}`);
    }
  }

  async transferCoupon(dto: CouponTransfer) {
    try {
      const transferredCoupon = await this.prisma.coupon.update({
        where: { id: dto.id },
        data: {
          ownedBy: dto.newUserId,
        },
      });
      return transferredCoupon;
    } catch (err) {
      throw new Error();
    }
  }
}

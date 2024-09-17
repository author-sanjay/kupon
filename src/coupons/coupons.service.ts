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
          expiry: new Date(dto.expiry),
          platform: dto.platform,
          title: dto.title,
          description: dto.description,
          isUsed: dto.isUsed,
          photoUrl: dto.photoUrl,
          createdBy: dto.createdBy,
          ownedBy: dto.createdBy,
          nftAddress: dto.nftAddress,
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

  async getSingleCouponByNftToken(token: string) {
    try {
      const coupon = await this.prisma.coupon.findFirst({
        where: { nftAddress: token },
      });

      return coupon;
    } catch (err) {
      throw new Error(
        `Failed to fetch coupon with NFT token ${token}: ${err.message}`,
      );
    }
  }

  async transferCoupon(dto: CouponTransfer) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { walletAddress: dto.newUserWalletAddress },
      });
      console.log('found new USER');

      if (!user) {
        throw new Error('User not found with the provided wallet address.');
      }

      const coupon = await this.prisma.coupon.findFirst({
        where: { nftAddress: dto.nftAddress },
      });
      console.log('FOund Coupon');
      if (!coupon) {
        throw new Error('Coupon not found with the provided nftAddress.');
      }

      const transferredCoupon = await this.prisma.coupon.update({
        where: { id: coupon.id }, // Use the unique identifier for updating
        data: {
          ownedBy: user.id,
        },
      });
      console.log('TRansfered');
      return transferredCoupon;
    } catch (err) {
      // Log the error and throw a more descriptive error
      console.error('Error transferring coupon:', err);
      throw new Error('Failed to transfer the coupon. Please try again later.');
    }
  }

  async useCoupon(tokenId: string) {
    try {
      const coupon = await this.prisma.coupon.findFirst({
        where: { nftAddress: tokenId },
      });

      if (!coupon) {
        throw new Error('Coupon not found with the provided nftAddress.');
      }

      // Step 3: Update the coupon with the new owner's ID
      const transferredCoupon = await this.prisma.coupon.update({
        where: { id: coupon.id }, // Use the unique identifier for updating
        data: {
          isUsed: true,
        },
      });

      return transferredCoupon;
    } catch (error) {
      throw error;
    }
  }
}

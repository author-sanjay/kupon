/*
  Warnings:

  - Added the required column `nftAddress` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "nftAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "walletAddress" TEXT NOT NULL;

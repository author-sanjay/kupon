import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CouponDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  discount: number;

  platform: string;
  description: string;
  photoUrl: string;
  @IsNotEmpty()
  @IsDate()
  expiry: Date;
  @IsNotEmpty()
  @IsBoolean()
  isUsed: boolean;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsNotEmpty()
  @IsString()
  nftAddress: string;
}

export class CouponTransfer {
  @IsNotEmpty()
  @IsString()
  nftAddress: string;

  @IsNotEmpty()
  @IsString()
  newUserWalletAddress: string;
}

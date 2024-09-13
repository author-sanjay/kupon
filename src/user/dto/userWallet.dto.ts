import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserWallet {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}

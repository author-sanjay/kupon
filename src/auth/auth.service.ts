import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new ForbiddenException(`Wrong Credentials`);
      }

      const pwMatched = await argon.verify(user.hash, dto.password);
      if (!pwMatched) {
        throw new ForbiddenException(`Wrong Credentials`);
      }

      return this.signToken(user.id, user.email);
    } catch (err) {
      throw err;
    }
  }
  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          hash: hash,
          lastName: dto.lastName,
          isCompany: dto.isCompany,
          middleName: dto.middleName,
          walletAddress: null,
        },
      });

      delete user.hash;
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException(
            'Email Already Exists. Please try login',
          );
        }
      }
      throw e;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET_KEY'),
    });
    return {
      access_token: token,
    };
  }
}

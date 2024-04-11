import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await compare(signInDto.password, user.password);

    if (isMatch) {
      const payload = { sub: user.id };
      return {
        token: await this.jwtService.signAsync(payload),
        user: {
          email: user.email,
        },
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}

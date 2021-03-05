import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserSignInDto } from '../users/dto/user-sign-in.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  async signIn(userSignInDto: UserSignInDto): Promise<string> {
    const user = await this.userService.validateUserPassword(userSignInDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username, email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
}

import { Controller, Post, Body, ValidationPipe, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRegisteredResponse } from './models/user-registered.response';
import { UserSignInDto } from '../users/dto/user-sign-in.dto';
import { UserSignedInResponse } from './models/user-signed-in.response';
import { BaseAuthGuard } from './guard/base.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<UserRegisteredResponse> {
    return new UserRegisteredResponse(await this.authService.signUp(createUserDto));
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) userSignInDto: UserSignInDto): Promise<UserSignedInResponse> {
    return new UserSignedInResponse(await this.authService.signIn(userSignInDto));
  }
  @Get('/test')
  @UseGuards(BaseAuthGuard)
  test(@GetUser() user) {
    console.log(user);
  }
}

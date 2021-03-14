import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from '../../db';
import { User } from '../decorators';
import {
  UserLoginDto,
  UserLoginDtoResponse,
  UserRegisterDto,
  UserRegisterDtoResponse,
} from '../dto';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: UserRegisterDto,
  ): Promise<UserRegisterDtoResponse> {
    const user = await this.authService.register(data);
    return {
      user,
    };
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@User() user: UserEntity): Promise<UserLoginDtoResponse> {
    const access_token = '';
    return { access_token, user };
  }

  // async login(@Req() req: any): Promise<UserLoginDtoResponse> {
  //   const access_token = '';
  //   return { access_token, user: req.user };
  // }
}

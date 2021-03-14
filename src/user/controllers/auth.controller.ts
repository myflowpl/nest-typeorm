import { Get } from '@nestjs/common';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserEntity } from '../../db';
import { User } from '../decorators';
import {
  UserLoginDto,
  UserLoginDtoResponse,
  UserRegisterDto,
  UserRegisterDtoResponse,
  MeResponseDto,
} from '../dto';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

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
    const access_token = this.jwtService.sign({ userId: user.id });
    return { access_token, user };
  }

  @UseGuards(AuthGuard())
  @Get('me')
  @ApiBearerAuth()
  async me(@User() user: UserEntity): Promise<MeResponseDto> {
    return { user };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto, UserRegisterDtoResponse } from '../dto';
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
}

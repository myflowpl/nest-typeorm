import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { DbModule } from '../db';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './strategies';

@Module({
  imports: [DbModule, PassportModule],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalAuthStrategy],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { DbModule } from '../db';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}

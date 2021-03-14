import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { DbModule } from '../db';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalAuthStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DbModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('AUTH_JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalAuthStrategy, JwtStrategy],
})
export class UserModule {}

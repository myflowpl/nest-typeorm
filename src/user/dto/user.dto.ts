import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../db/entities';

export class UserRegisterDto {
  @ApiProperty({ example: 'Piotr' })
  name: string;

  @ApiProperty({ example: 'piotr@myflow.pl' })
  email: string;

  @ApiProperty({
    example: '123',
    description: 'hasło min 3 znak wielkie litery i cyfry',
  })
  password: string;
}

export class UserRegisterDtoResponse {
  user: UserEntity;
}

export class UserLoginDto {
  @ApiProperty({ example: 'piotr@myflow.pl' })
  email: string;
  @ApiProperty({ example: '123' })
  password: string;
}

export class UserLoginDtoResponse {
  access_token: string;
  user: UserEntity;
}
export class MeResponseDto {
  user: UserEntity;
}

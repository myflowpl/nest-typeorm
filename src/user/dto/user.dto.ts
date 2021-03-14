import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../db/entities';

export class UserRegisterDto {
  @ApiProperty({ example: 'Piotr' })
  name: string;

  @ApiProperty({ example: 'piotr@myflow.pl' })
  email: string;

  @ApiProperty({ example: '123' })
  password: string;
}

export class UserRegisterDtoResponse {
  user: UserEntity;
}

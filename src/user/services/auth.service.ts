import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../db/entities';
import { UserRegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../../db';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(userData: UserRegisterDto): Promise<UserEntity> {
    try {
      const passwordHash = await bcrypt.hash(userData.password, 10);
      const newUser = await this.usersRepository.create({
        ...userData,
        password: passwordHash,
      });
      await this.usersRepository.save(newUser);
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
}

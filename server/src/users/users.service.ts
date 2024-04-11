import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const plainPassword = createUserDto.password;
    const salt = await genSalt();
    createUserDto.password = await hash(plainPassword, salt);
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({
      order: {
        level: 'DESC',
        exp: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async completeLesson(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    user.exp = user.exp + 50;

    if (user.exp >= 100) {
      user.level = user.level + 1;
      user.exp = user.exp - 100;
    }

    return this.usersRepository.update(+id, user);
  }
}

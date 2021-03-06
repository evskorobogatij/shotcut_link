import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const pwd = await hash(createUserDto.password, 15);
    const user = this.usersRepository.create();
    user.name = createUserDto.name;
    user.password = pwd;
    console.log(user);
    await this.usersRepository.save(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(
      { name: username },
      { select: ['id', 'name', 'password'] },
    );
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthJwtDto } from 'src/auth-jwt.dto';

type RegisterResponse = {
  access_token: string;
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Регистрация пользователя' })
  @ApiOkResponse({
    type: AuthJwtDto,
    description: 'Возвращает объект, содержащий jwt токен',
  })
  @Post('/register')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterResponse> {
    const user = await this.usersService.create(createUserDto);
    const res = await this.authService.login({ id: user.id, name: user.name });
    return res;
  }
}

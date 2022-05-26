import {
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthJwtDto } from './auth-jwt.dto';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ShortLinkService } from './short-link/short-link.service';

class AuthUserDTO {
  @ApiProperty({ default: 'test' })
  username: string;

  @ApiProperty({ default: '1111' })
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private shortLinkService: ShortLinkService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    description:
      'Аутентификация пользователя. В ответ на логин/пароль получаем jwt токен, который используется для защищенных роутов',
  })
  @ApiBody({
    type: AuthUserDTO,
  })
  @ApiOkResponse({
    type: AuthJwtDto,
    description:
      'При успешной авторизации, возвращает объект, содержащий jwt токен. Время действия токена: 2 минуты',
  })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    description:
      'При переходе по /s/{short} происходит переход по полной ссылке',
  })
  @Get('s/:short')
  async go(@Param('short') short: string, @Response() res, @Ip() ip) {
    const link = await this.shortLinkService.getByShort(short, ip);
    if (link) {
      return res.redirect(link.link);
    }
    return link; //
  }
}

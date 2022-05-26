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
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ShortLinkService } from './short-link/short-link.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private shortLinkService: ShortLinkService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('s/:short')
  async go(@Param('short') short: string, @Response() res, @Ip() ip) {
    const link = await this.shortLinkService.getByShort(short, ip);
    if (link) {
      return res.redirect(link.link);
    }
    return link; //
  }
}

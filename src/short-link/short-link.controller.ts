import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ShortLinkInfoDTO } from './dto/short-link-info.dto';
import { ShortLinkRespDto } from './dto/short-link-resp.dto';

@Controller('short-link')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @ApiBearerAuth()
  @ApiOperation({ description: 'Генерация короткой ссылки' })
  @ApiOkResponse({
    type: ShortLinkRespDto,
    description:
      'В ответе приходит объект содержащий путь к cокращенной ссылке',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShortLinkDto: CreateShortLinkDto, @Request() req) {
    return this.shortLinkService.create(createShortLinkDto, req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Получение статистики по коротким ссылкам пользователя',
  })
  @ApiOkResponse({
    type: ShortLinkInfoDTO,
    description:
      'Содержит массив сокращенных ссылок пользователя с информацией о частоте переходов по ним',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.shortLinkService.findAll(req.user.userId);
  }
}

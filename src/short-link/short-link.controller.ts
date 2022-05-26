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

@Controller('short-link')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShortLinkDto: CreateShortLinkDto, @Request() req) {
    return this.shortLinkService.create(createShortLinkDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.shortLinkService.findAll(req.user.userId);
  }
}

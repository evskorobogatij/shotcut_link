import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ShortLink } from './entities/short-link.entity';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectRepository(ShortLink)
    private shortLinkRepository: Repository<ShortLink>,
    private usersService: UsersService,
  ) {}
  async create(createShortLinkDto: CreateShortLinkDto, userId: string) {
    const w = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    const short = Array(5)
      .fill(1)
      .map(() => w[Math.floor(Math.random() * w.length)])
      .join('');

    const shortLink = this.shortLinkRepository.create();
    shortLink.link = createShortLinkDto.link;
    shortLink.short = short;
    shortLink.user = await this.usersService.findById(userId);
    this.shortLinkRepository.save(shortLink);
    return { short };
  }

  async getByShort(short: string) {
    const link = await this.shortLinkRepository.findOne({ short });
    if (link) {
      return { link: link.link };
    } else {
      link: undefined;
    }
  }

  findAll() {
    return `This action returns all shortLink`;
  }
}

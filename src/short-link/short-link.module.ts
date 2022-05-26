import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from './entities/short-link.entity';
import { UsersModule } from 'src/users/users.module';
import { ShortLinkVisit } from './entities/short-link-visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink, ShortLinkVisit]), UsersModule],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
  exports: [ShortLinkService],
})
export class ShortLinkModule {}

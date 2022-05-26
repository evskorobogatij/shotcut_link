import { ApiProperty } from '@nestjs/swagger';

export class ShortLinkRespDto {
  @ApiProperty({ description: 'элемент сокращенной ссылки', example: 'iMM4U' })
  short: string;
}

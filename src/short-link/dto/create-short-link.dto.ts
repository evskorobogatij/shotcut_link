import { ApiProperty } from '@nestjs/swagger';
export class CreateShortLinkDto {
  @ApiProperty({
    description: 'Ссылка для сокращения',
    default: 'https://yandex.ru',
  })
  link: string;
}

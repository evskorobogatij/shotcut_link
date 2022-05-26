import { ApiProperty } from '@nestjs/swagger';

export class ShortLinkInfoDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  short: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  count: number;
}

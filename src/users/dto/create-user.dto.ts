import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'test' })
  name: string;

  @ApiProperty({ default: '12345' })
  password: string;
}

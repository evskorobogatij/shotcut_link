import { ApiProperty } from '@nestjs/swagger';

export class AuthJwtDto {
  @ApiProperty({
    description: 'jwt-токен',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...',
  })
  access_token: string;
}

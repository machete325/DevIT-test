import { ApiProperty } from '@nestjs/swagger';

export class AuthOutput {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

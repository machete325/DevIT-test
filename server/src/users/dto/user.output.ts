import { ApiProperty } from '@nestjs/swagger';

export class UserOutput {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}

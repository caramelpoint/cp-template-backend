import { ApiProperty } from '@nestjs/swagger';

export class UserSignedInResponse {
  constructor(accessStrong: string) {
    this.accessToken = accessStrong;
  }
  @ApiProperty()
  accessToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';

export class UserRegisteredResponse {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
  }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public username: string;
}

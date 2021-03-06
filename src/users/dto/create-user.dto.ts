import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

const passwordRegexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(passwordRegexp, {
    message: 'Password should contain at least one upper case, one lower case, one digit and one symbol',
  })
  password: string;
}

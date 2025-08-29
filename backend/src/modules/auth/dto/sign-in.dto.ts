import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'The username for authentication',
    example: 'john_doe',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Username is too long' })
  username: string;

  @ApiProperty({
    description: 'The password for authentication',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

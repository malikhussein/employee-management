import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username for the new user',
    example: 'john_doe',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Username is too long' })
  username: string;

  @ApiProperty({
    description:
      'The password for the new user (at least 8 characters with one letter and one number)',
    example: 'password123',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter and one number',
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: RoleEnum,
    example: RoleEnum.USER,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}

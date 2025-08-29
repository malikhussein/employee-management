import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'First name of the employee',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the employee',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email address of the employee',
    example: 'john.doe@company.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Hire date of the employee',
    example: '2024-01-15',
    type: 'string',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDateString()
  hireDate: Date;

  @ApiProperty({
    description: 'Salary of the employee',
    example: 50000.0,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @ApiProperty({
    description: 'Department ID of the employee',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  departmentId?: number;
}

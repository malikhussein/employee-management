import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SeedService } from './seed.service';

class SeedCountDto {
  count?: number;
}

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed users with fake data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { count: { type: 'number', default: 10 } },
    },
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Users seeded successfully',
  })
  async seedUsers(@Body() body: SeedCountDto = {}) {
    return await this.seedService.seedUsers(body.count || 10);
  }

  @Post('departments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed departments with fake data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { count: { type: 'number', default: 6 } },
    },
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Departments seeded successfully',
  })
  async seedDepartments(@Body() body: SeedCountDto = {}) {
    return await this.seedService.seedDepartments(body.count || 6);
  }

  @Post('employees')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed employees with fake data' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { count: { type: 'number', default: 50 } },
    },
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Employees seeded successfully',
  })
  async seedEmployees(@Body() body: SeedCountDto = {}) {
    return await this.seedService.seedEmployees(body.count || 50);
  }

  @Post('all')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed all data (users, departments, employees)' })
  @ApiResponse({
    status: 201,
    description: 'All data seeded successfully',
  })
  async seedAll() {
    return await this.seedService.seedAll();
  }

  @Get('counts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current data counts' })
  @ApiResponse({
    status: 200,
    description: 'Data counts retrieved successfully',
  })
  async getDataCounts() {
    return await this.seedService.getDataCounts();
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Clear all seeded data' })
  @ApiResponse({
    status: 200,
    description: 'All data cleared successfully',
  })
  async clearData() {
    return await this.seedService.clearData();
  }
}

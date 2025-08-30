import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard statistics retrieved successfully',
  })
  async getStatistics() {
    const stats = await this.dashboardService.getStatistics();
    return {
      message: 'Dashboard statistics retrieved successfully',
      data: stats,
    };
  }

  @Get('department-distribution')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get department distribution' })
  @ApiResponse({
    status: 200,
    description: 'Department distribution retrieved successfully',
  })
  async getDepartmentDistribution() {
    const distribution =
      await this.dashboardService.getDepartmentDistribution();
    return {
      message: 'Department distribution retrieved successfully',
      distribution,
    };
  }

  @Get('recent-hires')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get recent hires' })
  @ApiResponse({
    status: 200,
    description: 'Recent hires retrieved successfully',
  })
  async getRecentHires() {
    const recentHires = await this.dashboardService.getRecentHires();
    return {
      message: 'Recent hires retrieved successfully',
      recentHires,
    };
  }
}

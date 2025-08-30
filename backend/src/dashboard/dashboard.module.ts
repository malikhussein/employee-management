import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Department } from 'src/modules/department/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

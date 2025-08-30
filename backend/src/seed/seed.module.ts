import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { User } from 'src/modules/user/entities/user.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department, Employee])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

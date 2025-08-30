import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Department } from 'src/modules/department/entities/department.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async getStatistics() {
    // Get total employees
    const totalEmployees = await this.employeeRepository.count();

    // Get total departments
    const totalDepartments = await this.departmentRepository.count();

    // Get recent hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentHires = await this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.hireDate >= :thirtyDaysAgo', { thirtyDaysAgo })
      .getCount();

    return {
      totalEmployees,
      totalDepartments,
      recentHires,
    };
  }

  async getDepartmentDistribution() {
    const departmentStats = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin('employee.department', 'department')
      .select('department.name', 'departmentName')
      .addSelect('COUNT(employee.id)', 'employeeCount')
      .where('department.name IS NOT NULL')
      .groupBy('department.name')
      .getRawMany();

    return departmentStats.map((stat) => ({
      departmentName: stat.departmentName,
      employeeCount: parseInt(stat.employeeCount),
    }));
  }

  async getRecentHires() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentHires = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .where('employee.hireDate >= :thirtyDaysAgo', { thirtyDaysAgo })
      .orderBy('employee.hireDate', 'DESC')
      .limit(10)
      .getMany();

    return recentHires;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      department: { id: createEmployeeDto.departmentId },
    });
    return this.employeeRepository.save(employee);
  }

  findAll(
    employeeFilterDto: EmployeeFilterDto,
  ): Promise<PaginatedResponse<Employee>> {
    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department');

    // Apply filters
    if (employeeFilterDto.search) {
      queryBuilder.andWhere(
        '(employee.firstName ILIKE :search OR employee.lastName ILIKE :search OR employee.email ILIKE :search)',
        { search: `%${employeeFilterDto.search}%` },
      );
    }

    if (employeeFilterDto.firstName) {
      queryBuilder.andWhere('employee.firstName ILIKE :firstName', {
        firstName: `%${employeeFilterDto.firstName}%`,
      });
    }

    if (employeeFilterDto.lastName) {
      queryBuilder.andWhere('employee.lastName ILIKE :lastName', {
        lastName: `%${employeeFilterDto.lastName}%`,
      });
    }

    if (employeeFilterDto.email) {
      queryBuilder.andWhere('employee.email ILIKE :email', {
        email: `%${employeeFilterDto.email}%`,
      });
    }

    if (employeeFilterDto.departmentId) {
      queryBuilder.andWhere('employee.departmentId = :departmentId', {
        departmentId: employeeFilterDto.departmentId,
      });
    }

    if (employeeFilterDto.minSalary) {
      queryBuilder.andWhere('employee.salary >= :minSalary', {
        minSalary: employeeFilterDto.minSalary,
      });
    }

    if (employeeFilterDto.maxSalary) {
      queryBuilder.andWhere('employee.salary <= :maxSalary', {
        maxSalary: employeeFilterDto.maxSalary,
      });
    }

    if (employeeFilterDto.hireDateFrom) {
      queryBuilder.andWhere('employee.hireDate >= :hireDateFrom', {
        hireDateFrom: employeeFilterDto.hireDateFrom,
      });
    }

    if (employeeFilterDto.hireDateTo) {
      queryBuilder.andWhere('employee.hireDate <= :hireDateTo', {
        hireDateTo: employeeFilterDto.hireDateTo,
      });
    }

    return PaginationService.paginate(
      queryBuilder,
      employeeFilterDto,
      'employee.createdAt',
    );
  }

  findOne(id: number) {
    return this.employeeRepository.findOneBy({ id });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { departmentId, ...employeeData } = updateEmployeeDto;
    await this.employeeRepository.update(id, {
      ...employeeData,
      ...(departmentId && { department: { id: departmentId } }),
    });

    return this.findOne(id);
  }

  remove(id: number) {
    return this.employeeRepository.softDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.employeeRepository.find();
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

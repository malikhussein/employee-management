import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentFilterDto } from './dto/department-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/pagination.interface';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  findAll(
    filterDto: DepartmentFilterDto,
  ): Promise<PaginatedResponse<Department>> {
    const queryBuilder = this.departmentRepository
      .createQueryBuilder('department')
      .leftJoinAndSelect('department.employees', 'employees');

    if (filterDto.name) {
      queryBuilder.andWhere('department.name ILIKE :name', {
        name: `%${filterDto.name}%`,
      });
    }

    return PaginationService.paginate(
      queryBuilder,
      filterDto,
      'department.createdAt',
    );
  }

  findOne(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.departmentRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.departmentRepository.softDelete(id);
  }
}

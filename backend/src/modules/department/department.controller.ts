import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);
    return { message: 'Department created successfully', ...department };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const departments = await this.departmentService.findAll();
    return { message: 'Departments retrieved successfully', departments };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const department = await this.departmentService.findOne(+id);
    return { message: 'Department retrieved successfully', ...department };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const department = await this.departmentService.update(
      +id,
      updateDepartmentDto,
    );
    return { message: 'Department updated successfully', ...department };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    await this.departmentService.remove(+id);
    return { message: 'Department removed successfully' };
  }
}

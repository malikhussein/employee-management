import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class DepartmentFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;
}

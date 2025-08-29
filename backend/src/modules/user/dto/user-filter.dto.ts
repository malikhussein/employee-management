import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RoleEnum } from '../enums/role.enum';

export class UserFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;
}

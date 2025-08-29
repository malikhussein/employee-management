import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/modules/user/enums/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import {
  PaginatedResponse,
  PaginationMeta,
} from '../interfaces/pagination.interface';

export class PaginationService {
  static async paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
    defaultSortField?: string,
  ): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, sortBy, order = 'DESC' } = paginationDto;
    const skip = (page - 1) * limit;

    if (sortBy) {
      queryBuilder.orderBy(sortBy, order.toUpperCase() as 'ASC' | 'DESC');
    } else if (defaultSortField) {
      queryBuilder.orderBy(
        defaultSortField,
        order.toUpperCase() as 'ASC' | 'DESC',
      );
    }

    const totalItems = await queryBuilder.getCount();

    const data = await queryBuilder.skip(skip).take(limit).getMany();

    const totalPages = Math.ceil(totalItems / limit);

    const meta: PaginationMeta = {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return {
      data,
      meta,
    };
  }
}

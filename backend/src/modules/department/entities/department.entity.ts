import { BaseEntity } from 'src/common/entities/base.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class Department extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

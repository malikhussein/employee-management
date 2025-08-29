import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

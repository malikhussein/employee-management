import { Department } from 'src/modules/department/entities/department.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date', name: 'hire_date' })
  hireDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    eager: true,
    onDelete: 'SET NULL',
  })
  department: Department;
}

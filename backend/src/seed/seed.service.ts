import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/entities/user.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { RoleEnum } from 'src/modules/user/enums/role.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async seedUsers(count: number = 10) {
    const users = [];

    // Create an admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = this.userRepository.create({
      username: 'admin',
      password: adminPassword,
      role: RoleEnum.ADMIN,
    });
    users.push(adminUser);

    // Create regular users
    for (let i = 0; i < count - 1; i++) {
      const password = await bcrypt.hash('password123', 10);
      const user = this.userRepository.create({
        username: faker.internet.username(),
        password,
        role: faker.helpers.arrayElement([RoleEnum.USER, RoleEnum.ADMIN]),
      });
      users.push(user);
    }

    const savedUsers = await this.userRepository.save(users);
    return {
      message: `${savedUsers.length} users seeded successfully`,
      data: savedUsers.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
      })),
    };
  }

  async seedDepartments(count: number = 6) {
    const departmentNames = [
      'Engineering',
      'Marketing',
      'Sales',
      'Human Resources',
      'Finance',
      'Operations',
      'Customer Support',
      'Product Management',
      'Design',
      'Quality Assurance',
    ];

    const departments = [];
    for (let i = 0; i < Math.min(count, departmentNames.length); i++) {
      const department = this.departmentRepository.create({
        name: departmentNames[i],
      });
      departments.push(department);
    }

    const savedDepartments = await this.departmentRepository.save(departments);
    return {
      message: `${savedDepartments.length} departments seeded successfully`,
      data: savedDepartments,
    };
  }

  async seedEmployees(count: number = 50) {
    // Get all departments to assign employees to
    const departments = await this.departmentRepository.find();

    if (departments.length === 0) {
      throw new Error('No departments found. Please seed departments first.');
    }

    const employees = [];
    for (let i = 0; i < count; i++) {
      const employee = this.employeeRepository.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        hireDate: faker.date.between({
          from: new Date('2020-01-01'),
          to: new Date(),
        }),
        salary: parseFloat(
          faker.finance.amount({ min: 30000, max: 150000, dec: 2 }),
        ),
        department: faker.helpers.arrayElement(departments),
      });
      employees.push(employee);
    }

    const savedEmployees = await this.employeeRepository.save(employees);
    return {
      message: `${savedEmployees.length} employees seeded successfully`,
      data: savedEmployees,
    };
  }

  async seedAll() {
    // Clear existing data first
    await this.clearData();

    // Seed in order: users, departments, employees
    const userResult = await this.seedUsers(10);
    const departmentResult = await this.seedDepartments(6);
    const employeeResult = await this.seedEmployees(50);

    return {
      message: 'All data seeded successfully',
      summary: {
        users: userResult.data.length,
        departments: departmentResult.data.length,
        employees: employeeResult.data.length,
      },
      details: {
        users: userResult,
        departments: departmentResult,
        employees: employeeResult,
      },
    };
  }

  async clearData() {
    // Delete in reverse order due to foreign key constraints
    // Use createQueryBuilder to delete all records
    await this.employeeRepository.createQueryBuilder().delete().execute();
    await this.departmentRepository.createQueryBuilder().delete().execute();
    await this.userRepository.createQueryBuilder().delete().execute();

    return {
      message: 'All data cleared successfully',
    };
  }

  async getDataCounts() {
    const [userCount, departmentCount, employeeCount] = await Promise.all([
      this.userRepository.count(),
      this.departmentRepository.count(),
      this.employeeRepository.count(),
    ]);

    return {
      message: 'Data counts retrieved successfully',
      data: {
        users: userCount,
        departments: departmentCount,
        employees: employeeCount,
      },
    };
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { RoleEnum } from '../user/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findByUsername(
      signUpDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = await this.userService.create({
      username: signUpDto.username,
      password: hashedPassword,
      role: RoleEnum.USER,
    });
    return { user: newUser };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByUsername(signInDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };

    return { token: this.jwtService.sign(payload) };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findOne(changePasswordDto.userId);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!valid) throw new UnauthorizedException('Old password is incorrect');

    await this.userService.update(changePasswordDto.userId, {
      password: changePasswordDto.newPassword,
    });

    return { message: 'Password changed successfully' };
  }
}

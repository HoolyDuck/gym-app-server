import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: User): Promise<TokensDto> {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getProfile(user: User): Promise<User | null> {
    console.log(user);
    const foundUser = await this.userService.findOne({ id: user.id });
    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }

    return foundUser;
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userService.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.userService.findOne({ email: registerDto.email });
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await this.hashPassword(registerDto.password);
    await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }
}

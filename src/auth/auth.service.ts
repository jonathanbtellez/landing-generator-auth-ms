import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LogService } from 'src/log/log.service';
import { methodAuth, statusAuth, typeAuth } from 'src/common/enums';
import { SignUpDto } from './dto/sign-up.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly log: LogService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (!(await this.encryptService.compare(pass, user.password))) {
        const log = await this.log.create({
          user: user._id,
          type: typeAuth.LOGIN,
          status: statusAuth.ERROR,
          method: methodAuth.PASSWORD,
          result: { message: 'Password does not match' },
        });

        this.usersService.addLog(user._id, log._id);
        throw new BadRequestException('Password does not match');
      }
      const id = user._id;
      const log = await this.log.create({
        user: id,
        type: typeAuth.LOGIN,
        status: statusAuth.SUCCESS,
        method: methodAuth.PASSWORD,
        result: { message: 'Sign in succesfull' },
      });
      this.usersService.addLog(user._id, log._id);
      const payload = { sub: id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async handleRegisterUserEvent(
    signUpDto: SignUpDto,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.create(signUpDto);
      const id = user._id;
      const log = await this.log.create({
        user: id,
        type: typeAuth.REGISTER,
        status: statusAuth.SUCCESS,
        method: methodAuth.PASSWORD,
        result: { message: 'Sign up succesfull' },
      });

      this.usersService.addLog(user._id, log._id);
      const payload = { sub: id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

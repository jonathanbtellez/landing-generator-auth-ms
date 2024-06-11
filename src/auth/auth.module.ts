import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { LogModule } from 'src/log/log.module';
import { envs } from 'src/config';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: `${envs.tokenExpiration}` },
  }),
  UsersModule,
  EncryptModule,
  LogModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

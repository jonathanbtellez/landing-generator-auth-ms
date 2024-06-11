import {
  BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseFilters,
    UseGuards
  } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBasicAuth, ApiBody, ApiHeaders, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
  
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { envs } from 'src/config';
import { User } from 'src/users/schema/user.schema';
import { EventPattern, MessagePattern, RpcException } from '@nestjs/microservices';
import { RegisterUserEvent } from './events/register-user-event';
import { ExceptionFilter } from 'src/exception/rcp-exception.filter';
  
  @ApiBasicAuth()
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @UseFilters(new ExceptionFilter())
    @MessagePattern({cmd: 'login'})
    signIn(@Body() signInDto: SignInDto) {
      try {
        return this.authService.signIn(signInDto.email, signInDto.password);
      } catch (error) {
        throw error;
      }
    }


    @UseFilters(new ExceptionFilter())
    @MessagePattern({cmd: 'register'})
    async handleRegisterUser(data: RegisterUserEvent) {
      try {
        return await this.authService.handleRegisterUserEvent(data);
      } catch (error) {
        throw error;
      }
    }
  
    @ApiOperation({summary: 'Get the user profile data'})
    @ApiResponse({status: 200, description: 'User profile data'})
    @ApiUnauthorizedResponse({description: 'Invalide Token'})
    @ApiHeaders([{name: 'Authorization', description: 'Bearer token', required: true}])
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
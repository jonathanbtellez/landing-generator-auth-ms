import { Controller, Get, Post, Body, Param, Delete, BadRequestException, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try{
      const user = await this.usersService.findByEmail(createUserDto.email)
      if(user) throw new BadRequestException('User already exists');
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message); // Captura y maneja errores de validación
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id); 
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error.message); // Captura y maneja errores de validación
    }
  }

  @UseGuards(AuthGuard)
  @Get('/logs/:id')
  async findOneLogs(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOneLogs(id); 
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException(error.message); // Captura y maneja errores de validación
    }
  }


  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message); // Captura y maneja errores de validación
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

}

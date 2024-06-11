import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "juan@juan.com", required: true, description: 'Email user'})
  @IsNotEmpty()
  @IsString()
  password: string;
}
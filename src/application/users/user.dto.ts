import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Dean',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'de Meneses',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    description: 'Nome de usuário único',
    example: 'DeanVini',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'dean@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'dean@12345',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome do usuário',
    example: 'Dean',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Sobrenome do usuário',
    example: 'de Meneses',
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiPropertyOptional({
    description: 'Nome de usuário único',
    example: 'DeanVini',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'dean@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'DeanVini',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'dean@12345',
  })
  @IsString()
  password: string;
}

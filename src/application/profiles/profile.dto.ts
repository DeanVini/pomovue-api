import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Nome do perfil de Pomodoro',
    example: 'Trabalho Focado',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tempo de foco em minutos',
    example: 25,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  focusTime: number;

  @ApiProperty({
    description: 'Tempo de pausa curta em minutos',
    example: 5,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  break: number;

  @ApiProperty({
    description: 'Tempo de pausa longa em minutos',
    example: 15,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  longBreak: number;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({
    description: 'Nome do perfil de Pomodoro',
    example: 'Trabalho Focado',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tempo de foco em minutos',
    example: 30,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  focusTime?: number;

  @ApiPropertyOptional({
    description: 'Tempo de pausa curta em minutos',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  break?: number;

  @ApiPropertyOptional({
    description: 'Tempo de pausa longa em minutos',
    example: 20,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  longBreak?: number;
}

export class CreateProfileContainerDto {
  @ApiPropertyOptional({
    description: 'ID do último perfil ativo',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  lastProfile?: number = 1;

  @ApiProperty({
    description: 'Array de perfis de Pomodoro do usuário',
    type: [CreateProfileDto],
    example: [
      {
        name: 'Default',
        focusTime: 25,
        break: 5,
        longBreak: 15,
        id: 1
      },
      {
        name: 'Trabalho Intenso',
        focusTime: 50,
        break: 10,
        longBreak: 30,
        id: 2
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProfileDto)
  profileStored: CreateProfileDto[];
}

export class UpdateProfileContainerDto {
  @ApiPropertyOptional({
    description: 'ID do último perfil ativo',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  lastProfile?: number;

  @ApiPropertyOptional({
    description: 'Array de perfis de Pomodoro do usuário',
    type: [UpdateProfileDto],
    example: [
      {
        name: 'Default Atualizado',
        focusTime: 30,
        break: 5,
        longBreak: 15,
        id: 1
      }
    ]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProfileDto)
  profileStored?: UpdateProfileDto[];
}

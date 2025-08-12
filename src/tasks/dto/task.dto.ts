import { IsString, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Desenvolver o PomodoroVUE',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Status de conclusão da tarefa',
    default: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  finished?: boolean = false;

  @ApiPropertyOptional({
    description: 'Se a tarefa deve ser exibida',
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  show?: boolean = true;
}

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Descrição da tarefa',
    example: 'Desenvolver o PomodoroVUE',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status de conclusão da tarefa',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  finished?: boolean;

  @ApiPropertyOptional({
    description: 'Se a tarefa deve ser exibida',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  show?: boolean;
}

export class CreateTaskContainerDto {
  @ApiProperty({
    description: 'Array de tarefas do usuário',
    type: [CreateTaskDto],
    example: [
      {
        description: 'Desenvolver o PomodoroVUE',
        finished: false,
        show: true,
        id: 1
      },
      {
        description: 'Fazer um Backend',
        finished: false,
        show: true,
        id: 2
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  taskStored: CreateTaskDto[];
}

export class UpdateTaskContainerDto {
  @ApiPropertyOptional({
    description: 'Array de tarefas do usuário',
    type: [UpdateTaskDto],
    example: [
      {
        description: 'Desenvolver o PomodoroVUE',
        finished: true,
        show: true,
        id: 1
      }
    ]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTaskDto)
  taskStored?: UpdateTaskDto[];
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TasksService } from '../../application/tasks/tasks.service';
import { CreateTaskContainerDto, UpdateTaskContainerDto } from '../../application/tasks/task.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar container de tarefas para o usuário' })
  @ApiBody({ type: CreateTaskContainerDto })
  @ApiResponse({
    status: 201,
    description: 'Container de tarefas criado com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        taskStored: [
          {
            description: 'Desenvolver o PomodoroVUE',
            finished: false,
            show: true,
            id: 1
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  create(@Request() req, @Body() createTaskContainerDto: CreateTaskContainerDto) {
    return this.tasksService.create(req.user.userId, createTaskContainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar tarefas do usuário logado' })
  @ApiResponse({
    status: 200,
    description: 'Tarefas do usuário retornadas com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        taskStored: [
          {
            description: 'Desenvolver o PomodoroVUE',
            finished: false,
            show: true,
            id: 1
          },
          {
            description: 'Fazer um Backend',
            finished: true,
            show: true,
            id: 2
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Nenhuma tarefa encontrada para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  findMy(@Request() req) {
    return this.tasksService.findByUserId(req.user.userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar tarefas do usuário logado' })
  @ApiBody({ type: UpdateTaskContainerDto })
  @ApiResponse({
    status: 200,
    description: 'Tarefas atualizadas com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        taskStored: [
          {
            description: 'Desenvolver o PomodoroVUE - Atualizado',
            finished: true,
            show: true,
            id: 1
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  update(@Request() req, @Body() updateTaskContainerDto: UpdateTaskContainerDto) {
    return this.tasksService.upsert(req.user.userId, updateTaskContainerDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todas as tarefas do usuário logado' })
  @ApiResponse({ status: 200, description: 'Tarefas deletadas com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas para o usuário' })
  @ApiResponse({ status: 401, description: 'Token não fornecido ou inválido' })
  remove(@Request() req) {
    return this.tasksService.remove(req.user.userId);
  }
}

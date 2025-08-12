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
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova lista de tarefas' })
  @ApiBody({ type: CreateTaskContainerDto })
  @ApiResponse({
    status: 201,
    description: 'Lista de tarefas criada com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        taskStored: [
          {
            description: 'Estudar NestJS',
            finished: false,
            show: true
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Request() req, @Body() createTaskContainerDto: CreateTaskContainerDto) {
    return this.tasksService.create(req.user.id, createTaskContainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar tarefas do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Tarefas encontradas com sucesso',
    schema: {
      example: {
        id: 1,
        user_id: 1,
        taskStored: [
          {
            description: 'Estudar NestJS',
            finished: false,
            show: true
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas' })
  findByUser(@Request() req) {
    return this.tasksService.findByUserId(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar tarefas do usuário' })
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
            description: 'Estudar NestJS - Concluído',
            finished: true,
            show: true
          }
        ],
        created_at: '2025-08-11T21:00:00.000Z',
        updated_at: '2025-08-11T21:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Request() req, @Body() updateTaskContainerDto: UpdateTaskContainerDto) {
    return this.tasksService.upsert(req.user.id, updateTaskContainerDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar todas as tarefas do usuário' })
  @ApiResponse({ status: 200, description: 'Tarefas deletadas com sucesso' })
  @ApiResponse({ status: 401, description: 'Token de acesso inválido ou ausente' })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas' })
  remove(@Request() req) {
    return this.tasksService.remove(req.user.id);
  }
}

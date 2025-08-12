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
import { TasksService } from './tasks.service';
import { CreateTaskContainerDto, UpdateTaskContainerDto } from './dto/task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createTaskContainerDto: CreateTaskContainerDto) {
    return this.tasksService.create(req.user.userId, createTaskContainerDto);
  }

  @Get()
  findMy(@Request() req) {
    return this.tasksService.findByUserId(req.user.userId);
  }

  @Patch()
  update(@Request() req, @Body() updateTaskContainerDto: UpdateTaskContainerDto) {
    return this.tasksService.upsert(req.user.userId, updateTaskContainerDto);
  }

  @Delete()
  remove(@Request() req) {
    return this.tasksService.remove(req.user.userId);
  }
}

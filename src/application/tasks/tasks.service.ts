import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { CreateTaskContainerDto, UpdateTaskContainerDto } from './task.dto';
import { TaskResponse } from '../../domain/tasks/task.entity';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createTaskContainerDto: CreateTaskContainerDto): Promise<TaskResponse> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        taskStored: createTaskContainerDto.taskStored as any,
      },
    });

    return this.toTaskResponse(task);
  }

  async findByUserId(userId: number): Promise<TaskResponse | null> {
    const task = await this.prisma.task.findFirst({
      where: { userId },
    });

    if (!task) {
      return null;
    }

    return this.toTaskResponse(task);
  }

  async update(userId: number, updateTaskContainerDto: UpdateTaskContainerDto): Promise<TaskResponse> {
    try {
      const result = await this.prisma.task.updateMany({
        where: { userId },
        data: { taskStored: updateTaskContainerDto.taskStored as any },
      });

      if (result.count === 0) {
        throw new NotFoundException(`Tasks for user ${userId} not found`);
      }

      // Fetch the updated task
      const updatedTask = await this.prisma.task.findFirst({
        where: { userId },
      });

      return this.toTaskResponse(updatedTask!);
    } catch (error) {
      throw new NotFoundException(`Tasks for user ${userId} not found`);
    }
  }

  async upsert(userId: number, updateTaskContainerDto: UpdateTaskContainerDto): Promise<TaskResponse> {
    const existing = await this.findByUserId(userId);

    if (existing) {
      return this.update(userId, updateTaskContainerDto);
    } else {
      // Convert UpdateTaskDto[] to CreateTaskDto[] by providing default values for required fields
      const taskStored = (updateTaskContainerDto.taskStored || []).map(task => ({
        description: task.description || '',
        finished: task.finished ?? false,
        show: task.show ?? true,
      }));

      return this.create(userId, { taskStored });
    }
  }

  async remove(userId: number): Promise<void> {
    const result = await this.prisma.task.deleteMany({
      where: { userId },
    });

    if (result.count === 0) {
      throw new NotFoundException(`Tasks for user ${userId} not found`);
    }
  }

  // Helper method to convert Prisma model to API response
  private toTaskResponse(task: any): TaskResponse {
    return {
      id: Number(task.id),
      user_id: Number(task.userId),
      taskStored: task.taskStored as any,
      created_at: task.createdAt.toISOString(),
      updated_at: task.updatedAt.toISOString(),
    };
  }
}

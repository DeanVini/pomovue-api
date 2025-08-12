import { Module } from '@nestjs/common';
import { TasksController } from '../api/tasks/tasks.controller';
import { TasksService } from '../application/tasks/tasks.service';
import { PrismaModule } from '../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}

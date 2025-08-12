import { Module } from '@nestjs/common';
import { UsersController } from '../../api/users/users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

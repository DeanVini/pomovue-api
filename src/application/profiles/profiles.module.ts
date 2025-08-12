import { Module } from '@nestjs/common';
import { ProfilesController } from '../api/profiles/profiles.controller';
import { ProfilesService } from '../application/profiles/profiles.service';
import { PrismaModule } from '../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}

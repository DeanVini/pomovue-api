import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { SupabaseModule } from './infrastructure/config/supabase.module';
import { AuthModule } from './application/auth/auth.module';
import { UsersModule } from './application/users/users.module';
import { TasksModule } from './application/tasks/tasks.module';
import { ProfilesModule } from './application/profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    UsersModule,
    TasksModule,
    ProfilesModule,
  ],
})
export class AppModule {}

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      errorFormat: 'minimal',
    });
  }

  async onModuleInit() {
    try {
      const connectTimeout = process.env.NODE_ENV === 'production' ? 30000 : 5000;

      await this.connectWithRetry(3, connectTimeout);
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Database connection failed in production, continuing without DB');
      } else {
        throw error;
      }
    }
  }

  private async connectWithRetry(retries: number, timeout: number): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await Promise.race([
          this.$connect(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Connection timeout')), timeout)
          )
        ]);
        return;
      } catch (error) {
        console.warn(`Database connection attempt ${i + 1} failed:`, error.message);
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Backoff
      }
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🔌 Database disconnected');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async executeQuery<T>(queryFn: () => Promise<T>): Promise<T | null> {
    try {
      return await queryFn();
    } catch (error) {
      console.error('Query execution error:', error);
      if (process.env.NODE_ENV === 'production') {
        return null; // Retorna null em vez de falhar em produção
      }
      throw error;
    }
  }
}

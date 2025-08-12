import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedApp;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Pomodoro API')
    .setDescription('API REST para aplicação Pomodoro com NestJS, Prisma e Supabase')
    .setVersion('1.0')
    .addTag('auth', 'Autenticação e login')
    .addTag('users', 'Gestão de usuários')
    .addTag('tasks', 'Gestão de tarefas')
    .addTag('profiles', 'Perfis de Pomodoro')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Pomodoro API - Documentation'
  });

  await app.init();
  cachedApp = expressApp;
  return cachedApp;
}

// For Vercel serverless
export default async (req, res) => {
  const app = await createApp();
  return app(req, res);
};

// For local development
async function bootstrap() {
  const app = await createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
  });
}

// Only run bootstrap if not in serverless environment
if (require.main === module) {
  bootstrap();
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

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
    .addServer(process.env.NODE_ENV === 'production'
      ? 'https://api.pomovue.deanvinici.us'
      : 'http://localhost:3000',
      process.env.NODE_ENV === 'production' ? 'Production' : 'Development'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger docs available at http://localhost:${port}/docs`);
  }
}
bootstrap();

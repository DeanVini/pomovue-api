const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

let app;

async function createNestApplication() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('PomodoVue API')
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
    });

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await createNestApplication();
  return app.getHttpAdapter().getInstance()(req, res);
};

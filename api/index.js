const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
const { ValidationPipe } = require('@nestjs/common');

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Swagger configuration
    const config = new DocumentBuilder()
      .setTitle('Pomovue API')
      .setDescription('API for Pomodoro application with tasks and profiles')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const server = await createApp();
  const expressApp = server.getHttpAdapter().getInstance();
  return expressApp(req, res);
};

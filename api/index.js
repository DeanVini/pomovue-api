const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
const { ValidationPipe } = require('@nestjs/common');

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    const config = new DocumentBuilder()
      .setTitle('Pomovue API')
      .setDescription('API for Pomodoro application with tasks and profiles')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const server = await createApp();
  const expressApp = server.getHttpAdapter().getInstance();
  return expressApp(req, res);
};

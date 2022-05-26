import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Сервис сокращения ссылок')
    .setDescription(
      `Данный сервис позволяет генерировать короткие ссылки, 
      а также просматривать статистику по их сиспользованию для 
      авторизованых пользователей`,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Сервис сокращения ссылок | API',
  });
  await app.listen(process.env.APP_PORT || 8000);
}
bootstrap();

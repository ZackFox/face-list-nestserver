import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false, value: false },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Face List API')
    .setDescription('documentation')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .addBearerAuth()
    .setSchemes(process.env.NODE_ENV === 'production' ? 'https' : 'http')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

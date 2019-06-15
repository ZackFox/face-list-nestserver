import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './notFoundExceptionFilter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
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

  await app.listen(process.env.PORT);
}
bootstrap();

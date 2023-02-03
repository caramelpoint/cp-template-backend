import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { CrudConfiguration } from './config/crud.config';
CrudConfigService.load(CrudConfiguration);

const configureSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ibero Jet API')
    .setDescription('The Ibero Jet API documentation')
    .setVersion('1.0')
    .addTag('APIs')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('server.port');

  configureSwagger(app);

  await app.listen(port);
  logger.log(`Server running on port: ${port}`);
}
bootstrap();

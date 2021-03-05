import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/env.config';
import { configValidation } from './config/config-validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from './config/typeOrmModuleAsyncOptions.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from './config/jwtModuleAsyncOptions.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

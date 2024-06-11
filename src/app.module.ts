import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { MongoExceptionInterceptor } from './exception/mongo-exception.interceptor';

import { envs } from './config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.databaseUrl, 
      {
        retryWrites: true,
        w: 'majority',
        appName: 'Cluster55453'
      }
    ),
    AuthModule,
    UsersModule,
    EncryptModule,
    LogModule,
    ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MongoExceptionInterceptor,
    }  
  ],
  exports: []
})

export class AppModule {
}

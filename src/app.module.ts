import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShortLinkModule } from './short-link/short-link.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await configService.getTypeOrmConfig(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    AuthModule,
    ShortLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

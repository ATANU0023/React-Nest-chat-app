import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PusherService } from './pusher/pusher.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [PusherService],
})
export class AppModule {}

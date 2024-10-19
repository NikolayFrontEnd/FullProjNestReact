import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [UserModule,AuthModule, GameModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}

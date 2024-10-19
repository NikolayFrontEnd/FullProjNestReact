import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}
  async recordGame(userId: number, isSuccess: boolean) {
    // Получаем текущие игры пользователя
    const userGames = await this.prisma.game.findMany({ where: { userId } });
    
    // Подсчитываем общее количество игр и успешных игр
    const gamesPlayed = userGames.length + 1;
    const successCount = userGames.filter((game) => game.success === 1).length + (isSuccess ? 1 : 0);
    const successRate = (successCount / gamesPlayed) * 100;

    // Записываем новую игру в базу данных
    const newGame = await this.prisma.game.create({
      data: {
        userId,
        gamesPlayed,
        success: isSuccess ? 1 : 0,
        playingDate: new Date(),
      },
    });

    // Возвращаем данные об игре на фронтенд
    return {
      gameId: newGame.id,
      gamesPlayed,
      successCount,
      successRate,
      playingDate: newGame.playingDate,
    };
  }

  async getUserStats(userId: number) {
    // Получаем все игры пользователя
    const userGames = await this.prisma.game.findMany({ where: { userId } });

    // Подсчитываем общее количество игр и успешных игр
    const gamesPlayed = userGames.length;
    const successCount = userGames.filter((game) => game.success === 1).length;
    const successRate = gamesPlayed > 0 ? (successCount / gamesPlayed) * 100 : 0;

    // Возвращаем статистику пользователя
    return {
      userId,
      gamesPlayed,
      successCount,
      successRate,
    };
  }
}

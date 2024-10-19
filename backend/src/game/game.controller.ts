import { Controller, Get, Post, Body,  Param, UseGuards, Req} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface CustomRequest extends Request {
  user: {
    userId: number;
    username: string;
  };
}

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post('play')
  async playGame(@Req() req: CustomRequest, @Body() body: { isSuccess: boolean }) {
    const userId = req.user.userId;
    const { isSuccess } = body;
    const gameData = await this.gameService.recordGame(userId, isSuccess);
    return gameData;
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getUserStats(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    const userStats = await this.gameService.getUserStats(userId);
    return userStats;
  }



}

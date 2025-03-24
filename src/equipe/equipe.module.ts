import { Module } from '@nestjs/common';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';

@Module({
  controllers: [EquipeController],
  providers: [EquipeService],
})
export class EquipeModule {}

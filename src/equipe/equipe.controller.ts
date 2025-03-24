import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AtualizarMembroDto } from 'src/equipe/dto/atualizar-membro.dto';
import { CriarMembroDto } from 'src/equipe/dto/criar-membro.dto';
import { EquipeService } from 'src/equipe/equipe.service';

@Controller('equipe')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Post()
  create(@Body() CriarMembroDto: CriarMembroDto) {
    return this.equipeService.create(CriarMembroDto);
  }

  @Get()
  findAll() {
    return this.equipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizarMembroDto: AtualizarMembroDto,
  ) {
    return this.equipeService.update(id, atualizarMembroDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.equipeService.delete(id);
  }
}

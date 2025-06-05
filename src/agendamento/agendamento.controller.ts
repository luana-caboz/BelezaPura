import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentoService.findOne(id);
  }

  @Patch(':id')
<<<<<<< Updated upstream
  update(@Param('id') id: string, @Body() updateAgendamentoDto: UpdateAgendamentoDto) {
=======
  update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
  ) {
>>>>>>> Stashed changes
    return this.agendamentoService.update(id, updateAgendamentoDto);
  }

  /**@Get('historico')
  @UseGuards(RolesGuard)
  async historico(@Request() req) {
  return this.agendamentoService.listarHistorico(req.user);
}*/
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
}

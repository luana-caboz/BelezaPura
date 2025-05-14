import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentoService.create(createPagamentoDto);
  }

  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentoService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pagamentoService.delete(id);
  }
}

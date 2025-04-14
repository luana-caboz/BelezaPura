import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/clientes/clientes.module';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { Agendamento } from './entities/agendamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento, Cliente, Usuario]),
  forwardRef(() => UsuarioModule),
    ClientesModule
],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CriarMembroDto } from 'src/equipe/dto/criar-membro.dto';

export class AtualizarMembroDto extends PartialType(CriarMembroDto) {}

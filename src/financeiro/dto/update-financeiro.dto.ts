import { PartialType } from '@nestjs/mapped-types';
import { CriarFinanceiroDto } from './create-financeiro.dto';

export class UpdateFinanceiroDto extends PartialType(CriarFinanceiroDto) {}

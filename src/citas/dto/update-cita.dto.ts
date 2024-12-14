import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto } from './create-cita.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateCitaDto extends PartialType(CreateCitaDto) 
{
    @IsNumber()
    @IsPositive()
    id: number;
}

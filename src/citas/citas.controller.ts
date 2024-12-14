import { Controller, ParseIntPipe } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  //@Post()
  @MessagePattern({cmd: 'create_cita'})
  create(@Payload() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_citas'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.citasService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_cita'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.citasService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_cita'})
  update(@Payload() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(updateCitaDto.id, updateCitaDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_cita'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.citasService.remove(id);
  }
}

import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CitasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Citas Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createCitaDto: CreateCitaDto) {
    return this.cita.create({
      data: createCitaDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.cita.count({where:{NOT:{estadoCita:"Cancelada"}}});
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.cita.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where: {
          NOT:{estadoCita:"Cancelada"}
        }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const cita = await this.cita.findFirst({where: {id, NOT:{estadoCita:"Cancelada"}}})
    if(!cita) {
      throw new RpcException({
        message: `Cita con ID #${id} no encontrada`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {
    await this.findOne(id);
    const { id:__, ...data } = updateCitaDto;
    const cita = await this.cita.update({
      where: {id},
      data: data
    });
    return cita;
  }

  async remove(id: number) {
    await this.findOne(id);
    const cita = await this.cita.update({
      where: {id},
      data: {estadoCita: "Cancelada"}
    });
    return cita;
  }
}

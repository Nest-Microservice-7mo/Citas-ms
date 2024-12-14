import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateCitaDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idCliente: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idEmpleada: number;

    @IsDate()
    @Type(() => Date)
    public fechaCita: Date;

    @IsString()
    public horaCita: string;

    @IsString()
    public duracionCita: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public costoCita: number;

    @IsString()
    @IsOptional()
    public observacionesCita: string;

    @IsString()
    public estadoCita: string;
}

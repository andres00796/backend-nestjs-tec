import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ReportDto {

    
    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly state: number;

    readonly date: string;

    readonly id_user:number;

    
    
}

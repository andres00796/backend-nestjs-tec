
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class CloneImagesDto {

    @IsString()
    readonly idUnidad:string;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => String)    
    readonly listaUnidades:string[];

}

import { IsEnum } from "class-validator";
import { RolName } from "../rol.enum";

export class RolDto {
    @IsEnum(RolName,{message:'el rol solo puede ser user o admin'})
    readonly name:string;
}

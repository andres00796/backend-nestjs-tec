import { IsNotEmpty, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { ContactEntity } from "../contact.entity";
//npm i class-validator class-transformer
//instalar paquetes

export class ContactDto {
    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly relationship: string;

    readonly id_user:number;
}

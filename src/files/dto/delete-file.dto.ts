import { IsString } from "class-validator";


export class DeleteFileDto {

    @IsString()
    readonly idProduct:string;

    @IsString()
    readonly nameFile:string;

    constructor(idProduct:string,nameFile:string){
        this.idProduct = idProduct;
        this.nameFile = nameFile;
    }
}


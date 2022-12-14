import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductDto {

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly nameProduct: string;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly stock: number;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly state: number;

    readonly id_user:number;

    
    
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { ProductDto } from "src/product/dto/product-dto";

export class OrderDto {

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    readonly nameProduct: string;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly totalCost: number;

    @IsNumber()
    @IsNotEmpty()
    @IsNotBlank()
    readonly state: number;
    readonly date: string;

    readonly id_user:number;

    readonly products:ProductDto[];

    
}

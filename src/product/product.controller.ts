import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from "src/product/product.service";
import { CreateProductdto } from './dto/product-dto';

@Controller('products')
export class ProductController {

    constructor(
        private readonly product_service: ProductService
        ){}

    @Get()
    getAll(){
        return this.product_service.findAll();
    }

    @Post()
    create(@Body() entity: CreateProductdto){
        return this.product_service.create(entity);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() entity: CreateProductdto) {
        return this.product_service.update(id, entity);
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number) {
        return this.product_service.delete(id);
    }
}

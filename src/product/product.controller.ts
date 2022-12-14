import { Body, ConsoleLogger, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { GetPrincipal } from 'src/decorators/get-principal.decorator';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolName } from 'src/rol/rol.enum';
import { RolesGuard } from 'src/guard/rol.guard';
import { ProductDto } from './dto/product-dto';
import { ProductService } from './product.service';
import { response } from 'express';

@Controller('product')
export class ProductController {

    
    constructor(private product_service:ProductService){}

   // @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':id_user')
    create(@Body() new_product: ProductDto, @Res() response, @Param('id_user')id){
        this.product_service.createProduct(id, new_product).then( mensaje=>{
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la creacion de producto'});
        });
    }

    // @Post(':id_user')
    // createP(@Body() new_product: ProductDto, @Param('id_user')id){
    //     return this.product_service.createProduct(id,new_product);
    // }

    

    //@RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(@Res() response, @GetPrincipal() user:any){
        this.product_service.getAllProduct().then(mensajesList=>{
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error al obtener lista de los usuarios'});
        })
    }

    //@RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':idProduct')
    update(@Body() update_contact_dto: ProductDto, @Res() response, @Param('idProduct') idProduct){
        this.product_service.updateProduct(idProduct,update_contact_dto).then(mensaje=>{
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la actualizacion de usuario'});
        });
    }

    //@RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':idProduct')
    delete(@Res() response, @Param('idProduct') idProduct){
        this.product_service.deleteLogicUser(idProduct).then(mensaje=>{
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la eliminacion producto'});
        });
    }

    //@RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':idProduct')
    async getById(@Param('idProduct') idProduct){
        return await this.product_service.findById(idProduct);
    }

     //@RolDecorator(RolName.ADMIN,RolName.USER)
     @UseGuards(JwtAuthGuard, RolesGuard)
     @Get(':id/:ids')
     async getAllById(@Param('id') idProduct){
         return await this.product_service.getProductUser(idProduct);
     }



}

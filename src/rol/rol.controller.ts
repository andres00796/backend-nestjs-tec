import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolDto } from './dto/rol-dto';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {

    constructor(private readonly rol_service:RolService){}

    @Get()
    getAll(){
        return this.rol_service.getAll();
    }

    @Post()
    create(@Body() dto: RolDto){
        return this.rol_service.create(dto);
    }
}

import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { UsertypeService } from "src/usertypes/usertype.service";
import { CreateUserTypedto } from './dto/usertypes-dto';

@Controller()
export class UsertypeController { 

    constructor(
        private readonly reports_service: UsertypeService
        ){}

    @Get()
    getAll(){
        return this.reports_service.findAll();
    }


    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() entity: CreateUserTypedto) {
        return this.reports_service.update(id, entity);
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number) {
        return this.reports_service.delete(id);
    }
}


import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ReportsService } from "src/reports/reports.service";
import { CreateReportsdto } from './dto/reports-dto';

@Controller()
export class ReportsController { 

    constructor(
        private readonly reports_service: ReportsService
        ){}

    @Get()
    getAll(){
        return this.reports_service.findAll();
    }

    @Post()
    create(@Body() entity: CreateReportsdto){
        return this.reports_service.createReport(entity);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() entity: CreateReportsdto) {
        return this.reports_service.update(id, entity);
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number) {
        return this.reports_service.delete(id);
    }
}


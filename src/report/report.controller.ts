import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportDto } from './dto/report-dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {

    constructor(
        private order_service:ReportService
    ){}

    @Get()
    getAll(){
        return this.order_service.getAll();
    }

    @Post()
    create(@Body() dto: ReportDto){
        return this.order_service.create(dto);
    }

}

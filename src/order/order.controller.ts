import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderDto } from './dto/order-dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(
        private order_service:OrderService
    ){}

    @Get()
    getAll(){
        return this.order_service.getAll();
    }

    @Post()
    create(@Body() dto: OrderDto){
        return this.order_service.create(dto);
    }
}

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ReportsController,],
    providers: [
        ReportsService,],
})
export class SellerModule { }

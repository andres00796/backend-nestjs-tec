import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        SellerController,],
    providers: [
        SellerService,],
})
export class SellerModule { }

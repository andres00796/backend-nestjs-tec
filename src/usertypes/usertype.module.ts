import { UsertypeController } from './usertype.controller';
import { UsertypeService } from './usertype.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        UsertypeController,],
    providers: [
        UsertypeService,],
})
export class UsertypeModule { }

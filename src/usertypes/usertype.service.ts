import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateUserTypedto} from './dto/usertypes-dto';
import { UsertypeEntity } from 'src/usertypes/usertype.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UsertypeService {
    constructor(
    @InjectRepository(UsertypeEntity)
    private usertype_repository:Repository<UsertypeEntity>,
    ){}
    findAll(): Promise<UsertypeEntity[]> {
        return this.usertype_repository.find();
    }
 
    update(idusertypes: number, data: CreateUserTypedto): Promise<any> {
        return this.usertype_repository
        .createQueryBuilder()
        .update()
        .set({
          usertype: data.userType,
        })
        .where({ idusertypes })
        .execute()
      }
    delete(idusertypes: number): Promise<any> {
        return this.usertype_repository
        .createQueryBuilder()
        .delete()
        .from(UsertypeEntity)
        .where({ idusertypes })
        .execute()
      }
}

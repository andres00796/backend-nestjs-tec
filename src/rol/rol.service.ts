import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolDto } from './dto/rol-dto';
import { RolEntity } from './rol.entity';
import { RolRepository } from './rol.repository';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rol_repository:RolRepository
    ){}

    async getAll():Promise<RolEntity[]>{
        const rols = await this.rol_repository.find();
        if(!rols.length)throw new NotFoundException('no hay roles');
        return rols;
    }

    async create(dto: RolDto): Promise<any>{
        const exists = await this.rol_repository.findOne({where: {name: dto.name}});
        if(exists)throw new BadRequestException( 'ese rol ya existe');
       const rol=new RolEntity();
       rol.name=dto.name;
        return  await this.rol_repository.save(rol);
    }
}

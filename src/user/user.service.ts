import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolName } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UserDto } from './dto/user-dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rol_repository: RolRepository,
        @InjectRepository(UserEntity)
        private readonly user_repository:UserRepository,
    ){}

     async getAll():Promise<UserEntity[]>{
         const users = await this.user_repository.find();
         if(!users.length)throw new NotFoundException('no hay usuarios');
         return users;
     }
    async create(dto: UserDto): Promise<any>{
        const exists = await this.user_repository.findOne({where: {name: dto.name}});
        if(exists)throw new BadRequestException( 'ese usuario ya existe');
        const rol =await this.rol_repository.findOne({where: {name: RolName.ADMIN}}) ;
        const user=new UserEntity();
        user.name=dto.name;
        user.password=dto.password;
        user.rols=[rol] ;
        return  await this.user_repository.save(user);
    }

    async findById(id:number) :Promise<UserEntity>{
        const contact=await this.user_repository.findOne(id);
        if(!contact){
            throw new NotFoundException({message:'no existe'});
        }
        return contact;
    }

    async getAllContactById(id: number): Promise<UserEntity>{
        return await this.user_repository.findOne(id,{relations:['contact']} );
    }

    async deleteUser(id_user: number): Promise<any>{
     return await this.user_repository.delete(id_user);
    }

    async getContactUser(id_user:number): Promise<UserEntity[]>{
        return await this.user_repository.find({where: {id_user:id_user}})
    }

}

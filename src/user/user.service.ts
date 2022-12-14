import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolName } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { Connection } from 'typeorm';
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
        private readonly connection: Connection,  
    ){}

     async getAll():Promise<UserEntity[]>{
         const users = await this.user_repository.find();
         if(!users.length)throw new NotFoundException('no hay usuarios');
         return users;
     }
    async create(dto: UserDto): Promise<any>{
        const exists = await this.user_repository.findOne({where: {name: dto.name}});
        if(exists)throw new BadRequestException( 'ese usuario ya existe');
        const rol = await this.rol_repository.findOne({where: {idRol: dto.idRol}}) ;
        const user = new UserEntity();
        user.name = dto.name;
        user.password = dto.password;
        user.firstName = dto.firstName;
        user.lastName = dto.lastName;
        user.state = 1;
        user.rol = rol;
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

    async updateUser(id_user: number, user_update: UserDto): Promise<UserEntity>{
        const user = await this.user_repository.findOne(id_user);
        user.name = user_update.name;
        user.state = user_update.state;
        user.password = user_update.password;
        user.firstName = user_update.firstName;
        user.lastName = user_update.lastName;
        return await this.user_repository.save(user);
    }

    async deleteLogicUser(id_user: number){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            let sql=`UPDATE user
            SET state = 0
            WHERE id_user = ${id_user}`
            let myquery=await queryRunner.manager.query(sql);
            await queryRunner.commitTransaction()
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateUserDelete(){
    }





}

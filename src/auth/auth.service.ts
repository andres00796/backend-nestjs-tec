import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RolEntity } from 'src/rol/rol.entity';
import { RolName } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UserEntity } from 'src/user/user.entity';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login-dto';
import { NewUserDto } from './dto/new-user-dto';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class AuthService {

    nameRol:string="";
    constructor(
        @InjectRepository(RolEntity)
        private readonly rol_repository: RolRepository,
        @InjectRepository(UserEntity)
        private readonly auth_repository:AuthRepository,
        private readonly jwt_service: JwtService,
        private readonly connection: Connection, 
    ){}

    async getAll():Promise<UserEntity[]>{
        const users = await this.auth_repository.find();
        if(!users.length)throw new NotFoundException('no hay usuarios');
        return users;
    }

    async create(dto: NewUserDto): Promise<any>{
        const exists = await this.auth_repository.findOne({where: {name: dto.name}});
        if(exists)throw new BadRequestException( 'ese usuario ya existe');
        const rol =await this.rol_repository.findOne({where: {name: RolName.USER}}) ;
        const user=new UserEntity();
        user.name=dto.name;
        user.password=dto.password;
        user.rol=rol ;
        return  await this.auth_repository.save(user);
    }

    async login(dto: LoginDto):Promise<any>{
        const {name} = dto;
        const user = await this.auth_repository.findOne({where: {name: name} });
        let nameRol = await this.datesUser(user.id_user);
        if(!user)return new UnauthorizedException('no existe');
        const pass = await compare(dto.password, user.password);
        if(!pass)return new UnauthorizedException('contraseña incorrecta');
        const payload: PayloadInterface={
            id: user.id_user,
            name: user.name,
            rol: nameRol
        }
        const token= await this.jwt_service.sign(payload);
        return {token}
    }


    async datesUser(id_user:number):Promise<any>{
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            let sql=`SELECT R.name AS NAME
            FROM user U
            INNER JOIN rol R ON R.idRol = U.idRol
            WHERE U.id_user = ${id_user}
            `
            let myquery=await queryRunner.manager.query(sql);
            await queryRunner.commitTransaction()
            for (let name of myquery)
            {
                this.nameRol = name.NAME
            }
        }
        finally {
            await queryRunner.release();
        }
        return this.nameRol;
    }
}

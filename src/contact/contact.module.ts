import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ContactEntity,
      RolEntity,
      RolRepository,
      AuthRepository,
      UserRepository,
      UserEntity
    ],
  )],
  providers: [ContactService,UserService],
  controllers: [ContactController]
})
export class ContactModule {}

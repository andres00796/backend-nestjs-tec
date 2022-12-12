import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { UserEntity } from './user.entity';
import { ContactService } from 'src/contact/contact.service';
import { ContactEntity } from 'src/contact/contact.entity';
import { ContactRepository } from 'src/contact/producto.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolEntity,UserEntity,ContactEntity, ContactRepository])
  ],
  providers: [UserService,ContactService],
  controllers: [UserController]
})
export class UserModule {}

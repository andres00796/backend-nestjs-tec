import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { UserEntity } from './user.entity';
import { ContactService } from 'src/contact/contact.service';
import { ContactEntity } from 'src/contact/contact.entity';
import { ContactRepository } from 'src/contact/producto.repository';
import { ProductEntity } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { FileService } from 'src/files/file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolEntity,
      UserEntity,
      ContactEntity, 
      ContactRepository, 
      ProductEntity,
      
      
      ])
  ],
  providers: [
    UserService,
    ContactService,
    ProductService,
    
  ],
  controllers: [UserController]
})
export class UserModule {}

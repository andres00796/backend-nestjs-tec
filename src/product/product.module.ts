import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { AuthRepository } from 'src/auth/auth.repository';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from './product.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ProductEntity,
      RolEntity,
      RolRepository,
      AuthRepository,
      UserRepository,
      UserEntity
    ],
  )],
  providers: [ProductService,UserService],
  controllers: [ProductController]
})
export class ProductModule {}

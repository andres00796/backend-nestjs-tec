import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { ProductEntity } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      ProductEntity,
      RolEntity,
      RolRepository,
      AuthRepository,
      UserRepository,
      UserEntity,
      OrderRepository,
      ProductRepository,
      OrderEntity
    ],
  )],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

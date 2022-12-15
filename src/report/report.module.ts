import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/auth.repository';
import { OrderEntity } from 'src/order/order.entity';
import { OrderRepository } from 'src/order/order.repository';
import { ProductEntity } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { ReportController } from './report.controller';
import { ReportEntity } from './report.entity';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';

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
      OrderEntity,
      ReportEntity,
      ReportRepository
    ],
  )],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}

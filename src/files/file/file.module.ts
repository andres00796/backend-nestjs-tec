import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthRepository } from 'src/auth/auth.repository';
import { OrderEntity } from 'src/order/order.entity';
import { OrderRepository } from 'src/order/order.repository';
import { ProductEntity } from 'src/product/product.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports:[        
    MulterModule.register({
      dest: './files'
    }),    
    ProductModule,  
    ProductEntity,
    RolEntity,
    RolRepository,
    AuthRepository,
    UserRepository,
    UserEntity,
    OrderRepository,
    ProductRepository,
    OrderEntity,
     
  ],
 
  controllers: [FileController],
  providers: [FileService,  ]
})
export class FileModule {}

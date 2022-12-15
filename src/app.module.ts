import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constans';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.31.90.55',
      port: 3306,
      username: 'dba_user',
      password: 'dba_user',
      database: 'ecommerce_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ContactModule,
    UserModule,
    RolModule,
    AuthModule,
    ProductModule,
      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
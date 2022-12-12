import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { UserEntity } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/constans';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature([RolEntity,UserEntity,AuthRepository]),
      PassportModule.register({
        defaultStrategy: 'jwt'
      }) ,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get(JWT_SECRET),
          signOptions:{
            expiresIn:7200
          }
        }),
        inject: [ConfigService],
      }),
    ],
    providers: [AuthService, ConfigService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtStrategy]
  })
  export class AuthModule {}
  

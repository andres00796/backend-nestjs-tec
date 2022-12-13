import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../../user/user.entity'
import { AuthRepository } from '../auth.repository';
import { ConfigService } from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/constans';
import { PayloadInterface } from '../payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(

    @InjectRepository(UserEntity)
    private readonly auth_repository:AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwt_service: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET)
    });
  }

  async validate(payload: PayloadInterface) {
      const {username}= payload;
      const user=await this.auth_repository.findOne({where: {username: username} });
      if(!user)return new UnauthorizedException('credenciales incorrectas');
      return payload;
    }
}
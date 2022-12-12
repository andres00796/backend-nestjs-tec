import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { NewUserDto } from './dto/new-user-dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly auth_service: AuthService){}

    @Get()
    getAll(){
        return this.auth_service.getAll();
    }

    @Post('new')
    create(@Body() dto: NewUserDto){
        return this.auth_service.create(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto){
        return this.auth_service.login(dto);
    }

}

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ContactService } from 'src/contact/contact.service';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/rol.guard';
import { RolName } from 'src/rol/rol.enum';
import { UserDto } from './dto/user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly user_service: UserService,
        private readonly contact_service: ContactService
        ){}

    @Get()
    getAll(){
        return this.user_service.getAll();
    }

    @Post()
    create(@Body() dto: UserDto){
        return this.user_service.create(dto);
    }

    @RolDecorator(RolName.ADMIN,RolName.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id_user')
    async getAllById(@Param('id_user') id_user){
        return await this.user_service.getAllContactById(id_user);
    }
    
    @RolDecorator(RolName.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id_user')
    delete(@Res() response, @Param('id_user') id_user){
        this.contact_service.deleteWhere(id_user);
        this.user_service.deleteUser(id_user).then(mensaje=>{
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la eliminacion usuario'});
        });
    }
  
}

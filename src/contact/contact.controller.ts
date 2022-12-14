import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact-dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { GetPrincipal } from 'src/decorators/get-principal.decorator';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolesGuard } from 'src/guard/rol.guard';
import { RolName } from 'src/rol/rol.enum';

@Controller('contact')
export class ContactController {

    constructor(private contact_service:ContactService){}

    // @RolDecorator(RolName.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Post(':id_user')
    // create(@Body() create_contact_dto: ContactDto, @Res() response,@Param('id_user')id){
    //     this.contact_service.createContact(id,create_contact_dto).then( mensaje=>{
    //         response.status(HttpStatus.CREATED).json(mensaje);
    //     }).catch(()=>{
    //         response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la creacion de nuevo usuario'});
    //     });
    // }

    // @RolDecorator(RolName.ADMIN,RolName.USER)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Get()
    // getAll(@Res() response, @GetPrincipal() user:any){
    //     this.contact_service.getAllContact().then(mensajesList=>{
    //         response.status(HttpStatus.OK).json(mensajesList);
    //     }).catch(()=>{
    //         response.status(HttpStatus.FORBIDDEN).json({mensaje:'error al obtener lista de los usuarios'});
    //     })
    // }

    // @RolDecorator(RolName.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Put(':id_contact')
    // update(@Body() update_contact_dto: ContactDto, @Res() response, @Param('id_contact') id_contact){
    //     this.contact_service.updateContact(id_contact,update_contact_dto).then(mensaje=>{
    //         response.status(HttpStatus.OK).json(mensaje);
    //     }).catch(()=>{
    //         response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la actualizacion de usuario'});
    //     });
    // }

    // @RolDecorator(RolName.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Delete(':id_contact')
    // delete(@Res() response, @Param('id_contact') id_contact){
    //     this.contact_service.deleteContact(id_contact).then(mensaje=>{
    //         response.status(HttpStatus.OK).json(mensaje);
    //     }).catch(()=>{
    //         response.status(HttpStatus.FORBIDDEN).json({mensaje:'error en la eliminacion usuario'});
    //     });
    // }

    // @RolDecorator(RolName.ADMIN,RolName.USER)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Get(':id_contact')
    // async getById(@Param('id_contact') id_contact){
    //     return await this.contact_service.findById(id_contact);
    // }

    //  @RolDecorator(RolName.ADMIN,RolName.USER)
    //  @UseGuards(JwtAuthGuard, RolesGuard)
    //  @Get(':id/:ids')
    //  async getAllById(@Param('id') id_contact){
    //      return await this.contact_service.getContactUser(id_contact);
    //  }

}

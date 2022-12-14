import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { ContactEntity } from './contact.entity';
import { ContactDto } from './dto/contact-dto';
import { ContactRepository } from './producto.repository';

@Injectable()
export class ContactService {
    contacts:ContactEntity[]=[];
    constructor(
        @InjectRepository(ContactEntity)
        private contact_repository:ContactRepository,
        @InjectRepository(UserEntity)
        private user_repository:UserRepository
    ){}

    // async getAllContact(): Promise<ContactEntity[]>{
    //     return await this.contact_repository.find();
    // }
 
    //  async createContact(id_user:number, new_contact: ContactDto): Promise<ContactEntity>{
    //      const user = await this.user_repository.findOne({where: {id_user: id_user }}) ;
    //      const contact = new ContactEntity();
    //      contact.name = new_contact.name;
    //      contact.phone = new_contact.phone;
    //      contact.relationship = new_contact.relationship;
    //      contact.user = user;
    //      return this.contact_repository.manager.save(contact);
    //  }
 
    //  async updateContact(id_contact: number, contact_update: ContactDto): Promise<ContactEntity>{
         
    //      const contact = await this.contact_repository.findOne(id_contact);
    //      contact.name = contact_update.name;
    //      contact.phone = contact_update.phone;
    //      contact.relationship=contact_update.relationship;
    //      return await this.contact_repository.save(contact);
    //  }
 
    //  async deleteContact(id_contact: number): Promise<any>{
    //      return await this.contact_repository.delete(id_contact);
    //  }
     
    //   async deleteWhere(id_user: number): Promise<any>{
    //      return await this.contact_repository
    //      .createQueryBuilder()
    //      .delete()
    //      .from('contact')
    //      .where("id_user = :id_user", {id_user:id_user})
    //      .execute();
    //  }

    //  async findById(id:number) :Promise<ContactEntity>{
    //      const contact=await this.contact_repository.findOne(id);
    //      if(!contact){
    //          throw new NotFoundException({message:'no existe'});
    //      }
    //      return contact;
    //  }

    //  async findByName(name_product: string):Promise <ContactEntity>{
    //      const contact= await this.contact_repository.findOne({name: name_product});
    //      return contact;
    //  }

    // async getContactUser(id:number): Promise<ContactEntity[]>{
    //     return await this.contact_repository.find({where: {user:id}})
    // }

}

import { hash } from "bcryptjs";
import { ContactEntity } from "src/contact/contact.entity";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => ContactEntity, (contact) => contact.user)
    contact: ContactEntity[];

    @ManyToMany(() => RolEntity, rol => rol.users,{eager: true})
    @JoinTable({
        name:'user_rol',
        joinColumn: {name: 'id_user'},
        inverseJoinColumn: {name:'id_rol'}
    })
    rols: RolEntity[];

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(){
        if(!this.password)return;
        this.password = await hash(this.password, 10)
    }

}
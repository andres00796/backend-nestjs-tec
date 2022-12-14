import { ContactEntity } from "src/contact/contact.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'rol'})
export class RolEntity {
    
    @PrimaryGeneratedColumn()
    idRol: number;

    @Column()
    name: string;

    @OneToMany(() => UserEntity, (user) => user.rol)
    user: UserEntity[];
}
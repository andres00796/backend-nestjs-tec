import { ContactEntity } from "src/contact/contact.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'rol'})
export class RolEntity {
    @PrimaryGeneratedColumn()
    id_rol: number;

    @Column()
    name: string;

    @OneToMany(() => UserEntity, (user) => user.rol)
    id_user: UserEntity[];
}
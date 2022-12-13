import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'contact'})
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id_contact: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    relationship: string;
/*
     @ManyToOne(() => UserEntity, (user) => user.contact)
     @JoinColumn({name: 'id_user'})
     user: UserEntity;
*/
}

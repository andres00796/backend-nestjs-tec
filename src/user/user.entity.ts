import { hash } from "bcryptjs";
import { UsertypeEntity } from "src/usertypes/usertype.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_user: number;


    @ManyToOne(() => UsertypeEntity, (rol) => rol.idUserType)
/*
    @ManyToMany(() => RolEntity, rol => rol.users,{eager: true})
    @JoinTable({
        name:'user_rol',
        joinColumn: {name: 'id_user'},
        inverseJoinColumn: {name:'id_rol'}
    })
    */
    idUserType: UsertypeEntity[];

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(){
        if(!this.password)return;
        this.password = await hash(this.password, 10)
    }

}
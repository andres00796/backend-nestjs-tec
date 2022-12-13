import { hash } from "bcryptjs";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToOne(() => RolEntity, (rol) => rol.id_rol)
/*
    @ManyToMany(() => RolEntity, rol => rol.users,{eager: true})
    @JoinTable({
        name:'user_rol',
        joinColumn: {name: 'id_user'},
        inverseJoinColumn: {name:'id_rol'}
    })
    */
    rol: RolEntity[];

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(){
        if(!this.password)return;
        this.password = await hash(this.password, 10)
    }

}
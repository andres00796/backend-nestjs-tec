import { hash } from "bcryptjs";
import { ContactEntity } from "src/contact/contact.entity";
import { ProductEntity } from "src/product/product.entity";
import { RolEntity } from "src/rol/rol.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    state: number;

    @OneToMany(() => ProductEntity, (product) => product.user)
    product: ProductEntity[];

    @ManyToOne(() => RolEntity, (rol) => rol.user)
    @JoinColumn({name:'idRol'})
    rol: RolEntity;


    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(){
        if(!this.password)return;
        this.password = await hash(this.password, 10)
    }

}
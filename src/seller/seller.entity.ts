import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('seller')
export class ProductEntity {
    @PrimaryGeneratedColumn() idUser:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    photo: Blob;

    @Column()
    stock: number;

    @Column()
    state: number;

}

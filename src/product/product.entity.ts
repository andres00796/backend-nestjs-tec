import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn() idProduct:number;

    @Column()
    nameProduct: string;

    @Column()
    stock: number;

    @Column()
    price: number;

    @Column()
    state: number;
    



}

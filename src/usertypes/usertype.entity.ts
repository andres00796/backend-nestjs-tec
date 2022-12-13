import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('userTypes')
export class UsertypeEntity {
    @PrimaryGeneratedColumn() idUserType:number;

    @Column()
    usertype: string;



}

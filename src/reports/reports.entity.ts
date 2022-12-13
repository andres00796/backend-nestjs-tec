import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany,ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from 'src/user/user.entity';


@Entity('reports')
export class ReportsEntity {
    @PrimaryGeneratedColumn() idReport:number;

    @Column()
    idUser: number;


    idUserSeller: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    state: number;

}

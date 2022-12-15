import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('report')
export class ReportEntity {

    @PrimaryGeneratedColumn() 
    idReport: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    state: number;

    @Column()
    date: string;

    @ManyToOne(() => UserEntity, (user) => user.report)
    @JoinColumn({name: 'id_user'})
    user: UserEntity;
    
}

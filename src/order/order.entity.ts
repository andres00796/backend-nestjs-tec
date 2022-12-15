
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class OrderEntity {

    @PrimaryGeneratedColumn() 
    idOrder: number;

    @Column()
    state: number;

    @Column()
    totalCost: number;

    @Column()
    date: string;

    @ManyToOne(() => UserEntity, (user) => user.order)
    @JoinColumn({name: 'id_user'})
    user: UserEntity;

    @ManyToMany(() => ProductEntity, product => product.orders,{eager: true})
    @JoinTable({
        name:'orderDetail',
        joinColumn: {name: 'idOrder'},
        inverseJoinColumn: {name:'idProduct'},
        
    })
    products: ProductEntity[];


    
}
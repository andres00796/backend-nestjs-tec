import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {

    @PrimaryGeneratedColumn() 
    idProduct:number;

    @Column()
    nameProduct: string;

    @Column()
    stock: number;

    @Column()
    price: number;

    @Column()
    state: number;

    @ManyToOne(() => UserEntity, (user) => user.product)
    @JoinColumn({name: 'id_user'})
    user: UserEntity;
    
}

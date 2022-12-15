import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Connection, EntityManager, getConnection } from 'typeorm';
import { OrderDto } from './dto/order-dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly rol_repository:OrderRepository,
        private readonly user_repository:UserRepository,
        private readonly prod_repository:ProductRepository,
        private readonly connection: Connection,  
    ){}

    async getAll():Promise<OrderEntity[]>{
        const rols = await this.rol_repository.find();
        if(!rols.length)throw new NotFoundException('no hay roles');
        return rols;
    }

    product:ProductEntity[]=[];
    productS:ProductEntity;
    async create(dto: OrderDto): Promise<any>{

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        const id=dto.id_user;
        const user= new UserEntity();
        user.id_user=id;
        console.log(dto.products)
        console.log(dto)
        for(let prod of dto.products)
        {
            const productS = await this.prod_repository.findOne(prod.idProduct)
            this.product.push(productS)
            this.updateStock(productS)
        }
        const order = new OrderEntity();
        order.state = 1;
        order.totalCost = dto.totalCost;
        order.date = dto.date;
        order.user = user;
        order.products=this.product;
        await queryRunner.manager.save(order)
        
        await queryRunner.commitTransaction()
    }

    async updateStock(product:ProductEntity){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            let sql=`UPDATE products
            SET stock = ${product.stock-1}
            WHERE idProduct = ${product.idProduct}`
            let myquery=await queryRunner.manager.query(sql);
            await queryRunner.commitTransaction()
        }
        finally {
            await queryRunner.release();
        }

    }


}

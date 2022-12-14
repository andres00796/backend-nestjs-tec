import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Connection } from 'typeorm';
import { ProductDto } from './dto/product-dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    products:ProductEntity[]=[];
    constructor(
        @InjectRepository(ProductEntity)
        private product_repository:ProductRepository,
        @InjectRepository(UserEntity)
        private user_repository:UserRepository,
        private readonly connection: Connection,  

    ){}

    async getAllProduct(): Promise<ProductEntity[]>{
        return await this.product_repository.find();
    }
 
     async createProduct(id_user:number, new_product: ProductDto): Promise<ProductEntity>{
         const user = await this.user_repository.findOne({where: {id_user: id_user }}) ;
         const product = new ProductEntity();
         console.log("create")
         console.log(user);
         console.log(product)
         console.log("product")
         product.nameProduct = new_product.nameProduct;
         product.stock = new_product.stock;
         product.price = new_product.price;
         product.state = new_product.state;
         product.user = user;
         return this.product_repository.manager.save(product);
     }
 
     async updateProduct(idProduct: number, product_update: ProductDto): Promise<ProductEntity>{
         
         const product = await this.product_repository.findOne(idProduct);
         product.nameProduct = product_update.nameProduct;
         product.stock = product_update.stock;
         product.state = product_update.state;
         product.price = product_update.price;
         return await this.product_repository.save(product);
     }
 
     async deleteProduct(idProduct: number): Promise<any>{
         return await this.product_repository.delete(idProduct);
     }
     
      async deleteWhere(idUser: number): Promise<any>{
         return await this.product_repository
         .createQueryBuilder()
         .delete()
         .from('contact')
         .where("idUser = :idUser", {idUser:idUser})
         .execute();
     }

     async findById(id:number) :Promise<ProductEntity>{
         const contact=await this.product_repository.findOne(id);
         if(!contact){
             throw new NotFoundException({message:'no existe'});
         }
         return contact;
     }

     async findByName(name_product: string):Promise <ProductEntity>{
         const contact= await this.product_repository.findOne({nameProduct: name_product});
         return contact;
     }

    async getProductUser(id:number): Promise<ProductEntity[]>{
        return await this.product_repository.find({where: {user:id}})
    }

    async deleteLogicUser(idProduct: number){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try{
            let sql=`UPDATE products
            SET state = 0
            WHERE idProduct = ${idProduct}`
            let myquery=await queryRunner.manager.query(sql);
            await queryRunner.commitTransaction()
        }
        finally {
            await queryRunner.release();
        }
    }

}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateProductdto} from './dto/product-dto';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm'

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(ProductEntity)
    private product_repository:Repository<ProductEntity>,
    ){}
    findAll(): Promise<ProductEntity[]> {
        return this.product_repository.find();
    }
    create(product: CreateProductdto): Promise<ProductEntity> {
        return this.product_repository.save(
          this.product_repository.create(product)
        );
    }
    findOne(idProduct: number): Promise<ProductEntity> {
        return this.product_repository.findOneBy({ idProduct });
    }
    update(idProduct: number, data: CreateProductdto): Promise<any> {
        return this.product_repository
        .createQueryBuilder()
        .update()
        .set({
          nameProduct: data.nameProduct,
          photo: data.photo,
          stock: data.stock,
          price:data.price,
          state:data.state
        })
        .where({ idProduct })
        .execute()
      }
    delete(idProduct: number): Promise<any> {
        return this.product_repository
        .createQueryBuilder()
        .delete()
        .from(ProductEntity)
        .where({ idProduct })
        .execute()
      }
}

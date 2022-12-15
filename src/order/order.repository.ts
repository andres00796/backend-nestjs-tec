import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { OrderEntity } from "./order.entity";

@EntityRepository(UserEntity)
export class OrderRepository extends Repository<OrderEntity>{}

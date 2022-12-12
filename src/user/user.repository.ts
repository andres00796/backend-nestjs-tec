import { RolEntity } from "src/rol/rol.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@EntityRepository(RolEntity)
export class UserRepository extends Repository<UserEntity>{}

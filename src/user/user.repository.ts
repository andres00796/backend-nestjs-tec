import { UsertypeEntity } from "src/usertypes/usertype.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@EntityRepository(UsertypeEntity)
export class UserRepository extends Repository<UserEntity>{}

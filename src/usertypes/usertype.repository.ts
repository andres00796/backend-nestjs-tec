import { EntityRepository, Repository } from "typeorm";
import { UsertypeEntity } from "./usertype.entity";

@EntityRepository(UsertypeEntity)
export class UsertypeRepository extends Repository<UsertypeEntity>{}
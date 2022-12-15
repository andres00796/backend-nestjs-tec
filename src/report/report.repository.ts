
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { ReportEntity } from "./report.entity";

@EntityRepository(UserEntity)
export class ReportRepository extends Repository<ReportEntity>{}


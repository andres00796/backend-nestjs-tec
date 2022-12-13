import { EntityRepository, Repository } from "typeorm";
import { ReportsEntity } from "./reports.entity";

@EntityRepository(ReportsEntity)
export class ReportsRepository extends Repository<ReportsEntity>{}
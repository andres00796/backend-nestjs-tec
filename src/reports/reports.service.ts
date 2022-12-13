import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateReportsdto} from './dto/reports-dto';
import { ReportsEntity } from 'src/reports/reports.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class ReportsService {
    constructor(
    @InjectRepository(ReportsEntity)
    private reports_repository:Repository<ReportsEntity>,
    ){}
    findAll(): Promise<ReportsEntity[]> {
        return this.reports_repository.find();
    }
    
    createReport(new_report: CreateReportsdto): Promise<ReportsEntity>{
      const report = new ReportsEntity();
      report.idUser= new_report.idUser;
      report.idUserSeller = new_report.idUserSeller;
      report.title = new_report.title;
      report.description = new_report.description;
      report.state = new_report.state;
      return this.reports_repository.manager.save(report);
  }


    update(idReports: number, data: CreateReportsdto): Promise<any> {
        return this.reports_repository
        .createQueryBuilder()
        .update()
        .set({
          title: data.title,
          description: data.description,
          state:data.state
        })
        .where({ idReports })
        .execute()
      }
    delete(idReports: number): Promise<any> {
        return this.reports_repository
        .createQueryBuilder()
        .delete()
        .from(ReportsEntity)
        .where({ idReports })
        .execute()
      }
}

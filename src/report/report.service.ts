import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Connection } from 'typeorm';
import { ReportDto } from './dto/report-dto';
import { ReportEntity } from './report.entity';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly report_repository:ReportRepository,
        private readonly user_repository:UserRepository,
        
        private readonly connection: Connection,  
    ){}

    async getAll():Promise<ReportEntity[]>{
        const rols = await this.report_repository.find();
        if(!rols.length)throw new NotFoundException('no hay reportes');
        return rols;
    }

    async create(dto: ReportDto): Promise<any>{

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        const id=dto.id_user;
        const user= new UserEntity();
        user.id_user=id;
        
        const report = new ReportEntity();
        report.state = 1;
        report.title = dto.title;
        report.description = dto.descripcion;
        report.date = '2022-12-15';
        report.user=user;
        await queryRunner.manager.save(report)
        
        await queryRunner.commitTransaction()
    }

   
}

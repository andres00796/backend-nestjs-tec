import { Body, Controller, Delete, Get, Param, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilemulterClass } from '../classes/filemulter.class';
import { DeleteFileDto } from '../dto/delete-file.dto';
import { editFileName, imageFileFilter, saveFile } from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { CloneImagesDto } from '../dto/clone-images.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(
        private readonly filesService: FileService
        ) { }




    @UseGuards(AuthGuard('jwt'))
    @Post('/files/upload/img')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: saveFile,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    uploadMultipleFiles(@Body('idProduct') idProduct: string, @UploadedFiles() files) {    

        const listFiles: FilemulterClass[] = [];

        files.forEach(file => {
            const myFile = new FilemulterClass(file.fieldname, file.originalname, file.encoding, file.mimetype, file.destination, file.filename, file.path, file.size);
            listFiles.push(myFile);
        });

        return this.filesService.saveFiles(idProduct,listFiles);       

    }

    // @UseGuards(AuthGuard('jwt'))
    // @Delete()
    // removeFile(@Body() deleteFileDto:DeleteFileDto){
    //     return this.filesService.deleteFile(deleteFileDto);
    // }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:idProduct/:imageName')
    removeFile(@Param('imageName') imageName:string,@Param('idProduct') idProduct:string){
        
        let deleteFileDto = new DeleteFileDto(idProduct,imageName);

        return this.filesService.deleteFile(deleteFileDto);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Get()
    // getFilesByIdProduct(@Body('idProduct') idProduct: string){        
    //      return this.filesService.getFiles(idProduct);
    // }


    // @UseGuards(AuthGuard('jwt'))
    @Get()
    getFilesByIdProduct(@Query('idProduct') idProduct: string){        
        
        return this.filesService.getFiles(idProduct);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/:idProduct/:imageName')
    getFileImage(@Param('imageName') imageName:string,@Param('idProduct') idProduct:string,@Res() res){
        const path = './files/images/' + idProduct;
        return res.sendFile(imageName, { root: path });               
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('clone')
    cloneImagenes(@Body() cloneImagesDto:CloneImagesDto){
        return this.filesService.cloneImagenes(cloneImagesDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('main')
    mainImage(
        @Body('file') file:string,
        @Body('path') path:string
        ){
        return this.filesService.mainImage(path , file);
    }
}




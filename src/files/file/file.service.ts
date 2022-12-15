import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FilemulterClass } from '../classes/filemulter.class';
import * as fs from 'fs';

// import * as FileSystem from 'pwd-fs';

import { DeleteFileDto } from '../dto/delete-file.dto';
import { CloneImagesDto } from '../dto/clone-images.dto';
//import { ProductService } from 'src/product/product.service';
//import { ProductEntity } from 'src/product/product.entity';
//import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FileService {

    constructor(
        // @InjectRepository(ProductEntity)
        // private productsService: ProductService,           
      ) {}

    async saveFiles(idProduct: string, listFiles: FilemulterClass[]) {

        if (!idProduct) {
            throw new HttpException(`El identificador del producto es necesario para la carga de archivos`, HttpStatus.CONFLICT);
        }

        try {
            //console.log('deberia leer este id'+idProduct)

            const path = './files/images/' + idProduct;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }

            listFiles.forEach(file => {
                const newPath = path + '/' + file.filename;
                fs.copyFileSync(file.path, newPath);
                fs.unlinkSync(file.path);
                file.path = newPath;
            });

            //aca necesito hacer update a tiene imagenes como si!
             //const resultadoActualizacionEstadoImagenes = await this.productsService.actualizarEstadoTieneImagenes(idProduct,true);

            return listFiles;
        } catch {
            throw new HttpException(`Error save files `, HttpStatus.CONFLICT);
        }

    }

    async deleteFile(deleteFile:DeleteFileDto){
        const { idProduct, nameFile } = deleteFile;

        if (!idProduct) {
            throw new HttpException(`El identificador del producto es necesario!`, HttpStatus.CONFLICT);
        }

        if (!nameFile) {
            throw new HttpException(`El nombre del archivo es necesario!`, HttpStatus.CONFLICT);
        }


        const pathFile = './files/images/' + idProduct + '/' + nameFile;
        try{
            fs.unlinkSync(pathFile);

            
            //verificar si quedo alguna imagen para este producto caso contrario marcar en base de datos, como que no tiene imagenes...
            const listFiles:string [] = this.getFiles(idProduct);
            if (listFiles.length<=0){
               // const resultadoActualizacionEstadoImagenes = await this.productsService.actualizarEstadoTieneImagenes(idProduct,false);
            }


            return deleteFile;
        }catch{
            throw new HttpException(`Error delete file`, HttpStatus.CONFLICT);
        }
    }

    getFiles(idProduct:string){
       

        if (!idProduct) {
            throw new HttpException(`El identificador del producto es necesario!`, HttpStatus.CONFLICT);
        }

        const path = './files/images/' + idProduct;

        if (!fs.existsSync(path)) {
            throw new HttpException(`Directory not found!`, HttpStatus.NOT_FOUND);
        }
        
        const listFiles:string [] = [];
        fs.readdirSync(path).forEach(file => {
            listFiles.push(file);            
        });      

        return listFiles;
    }

    async cloneImagenes(cloneImagesDto:CloneImagesDto){
       const { idUnidad,listaUnidades } = cloneImagesDto;

        const pathBase = './files/images/';
        const pathProductoPrincipal = pathBase + idUnidad;

        if (!fs.existsSync(pathProductoPrincipal)) {
            throw new HttpException(`Directorio de imagenes a clonar no existe!`, HttpStatus.NOT_FOUND);
        }

        let totalFiles = this.nroFiles(pathProductoPrincipal);                    
       
        if (totalFiles<=0){
            throw new HttpException(`Directorio de imagenes a clonar no contiene imagenes!`, HttpStatus.NOT_FOUND);    
        }

        
        for (let iddUnid of listaUnidades){
            let nroFiles = this.nroFiles(pathBase + iddUnid);
            if (nroFiles>0){
                // const unidad = await this.productsService.findOneById(iddUnid);
                // throw new HttpException(`El producto: ${ unidad.item }, con codigo: ${ unidad.codigo } ya cuenta con imagenes!`, HttpStatus.NOT_FOUND);    
            }
        }
        
        //si llega hasta aqui esta validado
        for (let iddUnid of listaUnidades){
            //eliminar carpeta por si existiera...
            if (fs.existsSync(pathBase + iddUnid)) {
                fs.rmdirSync(pathBase + iddUnid);
            } 

            this.copiarCarpetas(pathProductoPrincipal,pathBase+iddUnid);
            //const resultadoActualizacionEstadoImagenes = await this.productsService.actualizarEstadoTieneImagenes(iddUnid,true);
        }
       
        return cloneImagesDto;
    }

    async copiarCarpetas(pathOriginal:string,pathNuevo:string){
        //se asume que la carpeta nueva no existe... por eso no se hace el chequeo
        fs.mkdirSync( pathNuevo);
        let files = fs.readdirSync(pathOriginal);
        for (let file of files){
            
            fs.copyFileSync(pathOriginal + '/' + file, pathNuevo+ '/' +file);
        }
        
        // const pfs = new FileSystem();

        // await pfs.copy(pathOriginal, pathNuevo);
    }

    nroFiles(path:string) {
        
        let totalFiles = 0;        
        if (!fs.existsSync(path)) {
            return totalFiles;
        }        
        return fs.readdirSync(path).length;

    }
    
    mainImage(path, file)
    {
        const src='./files/images/';
        fs.copyFileSync(src+path+file, src+path+'0.jpg');
        return fs.readdirSync(src+path).length;
    }
}

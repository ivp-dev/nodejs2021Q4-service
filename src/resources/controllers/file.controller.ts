/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../services';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null,  join(__dirname, './../../../stored_files'));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

@Controller()
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('/file/:filename')
  async file(@Param('filename') filename: string): Promise<StreamableFile> {
    return this.fileService.getFile(filename);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) { }
}

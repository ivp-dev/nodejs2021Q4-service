/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFastifyInterceptor as FileInterceptor,
  diskStorage,
} from 'fastify-file-interceptor';
import { Express } from 'express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileService } from '../services';
import config from '../../common/config';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, config.FILE_STORE_PATH);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

@ApiTags('File')
@Controller()
export class FileController {
  constructor(private fileService: FileService) {}

  
  @Get('/file/:filename')
  @ApiOperation({ summary: 'Get file by name' })
  @ApiResponse({ status: HttpStatus.OK })
  async getFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const result = this.fileService.getFile(filename);

    if (!result) {
      throw new NotFoundException('File not found');
    }

    return result;
  }

  @ApiOperation({ summary: 'File upload' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('/file')
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {}
}

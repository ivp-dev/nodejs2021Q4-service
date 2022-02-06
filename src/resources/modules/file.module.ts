import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from '../controllers';
import { FileService } from '../services';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    MulterModule.register(),
  ],
})
export class FileModule {}

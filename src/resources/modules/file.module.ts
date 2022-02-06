import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileExpressController, FileFastifyController } from '../controllers';
import { FileService } from '../services';
import config from '../../common/config';

@Module({
  controllers: [
    config.USE_FASTIFY ? FileFastifyController : FileExpressController,
  ],
  providers: [FileService],
  imports: [MulterModule.register()],
})
export class FileModule {}

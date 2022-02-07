import { createReadStream, existsSync } from 'fs';
import { StreamableFile } from '@nestjs/common';
import path from 'path';
import config from '../../common/config';

export class FileService {
  constructor(private folder = config.FILE_STORE_PATH) {}

  getFile(fileName: string): StreamableFile | null {
    const filePath = path.join(this.folder, fileName);
    if (!existsSync(filePath)) {
      return null;
    }

    const file = createReadStream(path.join(this.folder, fileName));
    return new StreamableFile(file);
   
  }
}

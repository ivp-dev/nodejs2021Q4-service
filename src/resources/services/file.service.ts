import { createReadStream } from 'fs';
import { StreamableFile } from '@nestjs/common';
import { join } from 'path';

export class FileService {
  getFile(fileName: string) {
    const file = createReadStream(join(process.cwd(), fileName));
    return new StreamableFile(file);
  }
}

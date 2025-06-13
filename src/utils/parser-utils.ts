import { createInterface, Interface } from 'readline';
import { createReadStream, ReadStream } from 'fs';

class ParserUtils {
  getLineReaderByPath(path: string): Interface {
    const fileStream: ReadStream = createReadStream(path, 'utf8');

    return createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
  }

  splitByFirst(str: string, delimiter: string): string[] {
    const index: number = str.indexOf(delimiter);
    if (index === -1) return [str];
    return [str.slice(0, index), str.slice(index + delimiter.length)];
  }
}

export default new ParserUtils();

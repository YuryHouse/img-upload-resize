import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

class Resize {
  folder: string;
  constructor(folder: any) {
    this.folder = folder;
  }
  async save(buffer: any) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(150, 150, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);

    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename: string) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;
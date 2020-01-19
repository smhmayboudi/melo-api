import { Injectable } from "@nestjs/common";
import { ConstImagesDto } from "./dto/const.images.dto";

@Injectable()
export class ConstService {
  // constructor() {}

  async images(dto: ConstImagesDto): Promise<any> {
    return Promise.resolve(dto);
  }
}

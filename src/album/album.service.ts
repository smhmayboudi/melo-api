import { Injectable } from "@nestjs/common";
import { AlbumGetDto } from "./dto/album.get.dto";
import { AlbumLatestDto } from "./dto/album.latest.dto";

@Injectable()
export class AlbumService {
  // constructor() {}

  async get(dto: AlbumGetDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async latest(dto: AlbumLatestDto): Promise<any> {
    return Promise.resolve(dto);
  }
}

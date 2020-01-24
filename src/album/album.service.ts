import { Injectable } from "@nestjs/common";
import { DataAlbumDto } from "../data/dto/data.album.dto";
import { DataAlbumLatestDto } from "../data/dto/data.album.latest.dto";

@Injectable()
export class AlbumService {
  // constructor() {}

  async get(dto: DataAlbumDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async latest(dto: DataAlbumLatestDto): Promise<any> {
    return Promise.resolve(dto);
  }
}

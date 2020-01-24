import { Injectable } from "@nestjs/common";
import { AlbumDto } from "../data/dto/album.dto";
import { DataAlbumDto } from "../data/dto/data.album.dto";
import { DataAlbumLatestDto } from "../data/dto/data.album.latest.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { DataAlbumService } from "src/data/data.album.service";

@Injectable()
export class AlbumService {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  async get(dto: DataAlbumDto): Promise<AlbumDto> {
    return this.dataAlbumService.get(dto);
  }

  async latest(
    dto: DataAlbumLatestDto
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.dataAlbumService.lstest(dto);
  }
}

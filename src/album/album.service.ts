import { Injectable } from "@nestjs/common";
import { AlbumDto } from "../data/dto/album.dto";
import { DataAlbumDto } from "../data/dto/data.album.dto";
import { DataAlbumLatestDto } from "../data/dto/data.album.latest.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { DataAlbumService } from "../data/data.album.service";

@Injectable()
export class AlbumService {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  // TODO: mixSongs
  async byId(dto: DataAlbumDto): Promise<AlbumDto> {
    return this.dataAlbumService.byId(dto);
  }

  async latest(
    dto: DataAlbumLatestDto
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.dataAlbumService.lstest(dto);
  }
}

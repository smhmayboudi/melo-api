import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadImageDto } from "./dto/file.upload.image.dto";
import { FileEntity } from "./file.entity";
import { FileEntityRepository } from "./file.entity.repository";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: FileEntityRepository
  ) {}

  async uploadImage(dto: FileUploadImageDto): Promise<FileEntity | undefined> {
    return this.fileEntityRepository.save({
      created_at: new Date(),
      file_id: dto.fileId,
      file_name: "",
      id: 0,
      mime_type: dto.mimetype,
      owner_user_id: 0,
      size: dto.size
    });
  }
}

import { FileUploadImageReqDto, FileUploadImageResDto } from "@melo/common";

export interface FileServiceInterface {
  uploadImage(dto: FileUploadImageReqDto): Promise<FileUploadImageResDto>;
}

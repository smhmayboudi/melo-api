import { FileUploadImageReqDto } from "./dto/file.upload-image.req.dto";
import { FileUploadImageResDto } from "./dto/file.upload-image.res.dto";

export interface FileServiceInterface {
  uploadImage(
    dto: FileUploadImageReqDto,
    sub: number
  ): Promise<FileUploadImageResDto>;
}

import { FileFileReqDto } from "./dto/req/file.file.req.dto";
import { FileFileResDto } from "./dto/res/file.file.res.dto";

export interface FileServiceInterface {
  uploadImage(sub: number, dto?: FileFileReqDto): Promise<FileFileResDto>;
}

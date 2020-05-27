import { DataImageReqDto, DataImageResDto } from "@melo/common";

export interface DataImageServiceInterface {
  generateUrl(dto: DataImageReqDto): Promise<DataImageResDto>;
}

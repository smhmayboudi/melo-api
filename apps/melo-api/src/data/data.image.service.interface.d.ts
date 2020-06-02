import { ConstImageReqDto, ConstImageResDto } from "@melo/common";

export interface DataImageServiceInterface {
  generateUrl(dto: ConstImageReqDto): Promise<ConstImageResDto>;
}

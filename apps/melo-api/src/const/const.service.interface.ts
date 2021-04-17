import { ConstImagesReqDto, ConstImagesResDto } from "@melo/common";

export interface ConstServiceInterface {
  images(dto: ConstImagesReqDto): Promise<ConstImagesResDto>;
}

import {
  ConstImageReqDto,
  ConstImageResDto,
  ConstImagesReqDto,
  ConstImagesResDto,
} from "@melo/common";

export interface ConstServiceInterface {
  image(dto: ConstImageReqDto): Promise<ConstImageResDto>;
  images(dto: ConstImagesReqDto): Promise<ConstImagesResDto>;
}

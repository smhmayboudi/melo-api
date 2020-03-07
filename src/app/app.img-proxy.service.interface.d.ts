import { DataImageResDto } from "../data/dto/res/data.image.res.dto";

export interface AppImgProxyServiceInterface {
  generateUrl(normal: string, slider?: string): DataImageResDto;
}

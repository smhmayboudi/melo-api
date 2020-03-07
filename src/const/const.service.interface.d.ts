import { ConstImageResDto } from "./dto/res/const.image.res.dto";

export interface ConstServiceInterface {
  images(): Promise<{ [key: string]: ConstImageResDto }>;
}

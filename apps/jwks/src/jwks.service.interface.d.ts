import { JwksFindOneReqDto, JwksResDto } from "@melo/common";

export interface JwksServiceInterface {
  findOne(dto: JwksFindOneReqDto): Promise<JwksResDto | undefined>;
  getOneRandom(): Promise<JwksResDto | undefined>;
}

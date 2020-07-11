import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";

export interface AtServiceInterface {
  delete(dto: AtDeleteReqDto): Promise<AtResDto | undefined>;
  deleteByToken(dto: AtDeleteByTokenReqDto): Promise<AtResDto | undefined>;
  find(): Promise<AtResDto[]>;
  findOne(dto: AtFindOneReqDto): Promise<AtResDto | undefined>;
  findOneByToken(dto: AtFindOneByTokenReqDto): Promise<AtResDto | undefined>;
  save(entity: AtResDto): Promise<AtResDto>;
  update(entity: AtResDto): Promise<AtResDto | undefined>;
  validate(dto: AtValidateReqDto): Promise<AtResDto | undefined>;
  validateByToken(dto: AtValidateByTokenReqDto): Promise<AtResDto | undefined>;
}

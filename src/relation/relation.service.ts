import {
  HttpService,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationConfigService } from "./relation.config.service";
import { RelationServiceInterface } from "./relation.service.interface";

@Injectable()
// @PromInstanceCounter
export class RelationService implements RelationServiceInterface {
  private key(dto: RelationEntityResDto): string {
    return `${dto.type}_${dto.id}`;
  }

  private keys(dto: RelationEntityResDto[]): string {
    return dto.map(value => this.key(value)).join(",");
  }

  constructor(
    private readonly httpService: HttpService,
    private readonly relationConfigService: RelationConfigService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(
    dto: RelationGetReqDto
  ): Promise<RelationPaginationResDto<RelationEntityResDto>> {
    return this.httpService
      .get(
        `${this.relationConfigService.url}/get/${this.key(dto.fromEntityDto)}/${
          dto.relationType
        }/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (
            value: AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
          ) => value.data
        )
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async has(dto: RelationHasReqDto): Promise<void> {
    return this.httpService
      .get(
        `${this.relationConfigService.url}/has/${this.key(dto.from)}/${this.key(
          dto.to
        )}/${dto.relationType}`
      )
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          if (value.data === false) {
            throw new InternalServerErrorException();
          }
        })
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async multiHas(
    dto: RelationMultiHasReqDto
  ): Promise<RelationMultiHasResDto[]> {
    return this.httpService
      .get(
        `${this.relationConfigService.url}/multiHas/${this.key(
          dto.from
        )}/${this.keys(dto.tos)}/${dto.relationType}`
      )
      .pipe(map((value: AxiosResponse<RelationMultiHasResDto[]>) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async remove(dto: RelationRemoveReqDto): Promise<void> {
    return this.httpService
      .delete(`${this.relationConfigService.url}/remove`, {
        data: {
          entityId1: this.key(dto.from),
          entityId2: this.key(dto.to),
          relType: dto.relationType
        }
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          if (value.data === false) {
            throw new InternalServerErrorException();
          }
        })
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async set(dto: RelationSetReqDto): Promise<void> {
    return this.httpService
      .post(`${this.relationConfigService.url}/set`, {
        createdAt: dto.createdAt,
        entityId1: this.key(dto.from),
        entityId2: this.key(dto.to),
        relType: dto.relationType
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          if (value.data === false) {
            throw new InternalServerErrorException();
          }
        })
      )
      .toPromise();
  }
}

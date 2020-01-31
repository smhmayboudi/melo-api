import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationConfigService } from "./relation.config.service";

@Injectable()
export class RelationService {
  private key(dto: RelationEntityResDto): string {
    return `${dto.type}_${dto.id}`;
  }
  private keys(dto: RelationEntityResDto[]): string {
    return dto.map(value => this.key(value)).join(",");
  }

  constructor(
    private readonly relationConfigService: RelationConfigService,
    private readonly httpService: HttpService
  ) {}

  async get(
    dto: RelationGetReqDto
  ): Promise<RelationPaginationResDto<RelationEntityResDto>> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/get/${this.key(dto.fromEntityDto)}/${
          dto.relationType
        }/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (
            value: AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
          ) => {
            return value.data;
          }
        )
      )
      .toPromise();
  }

  async has(dto: RelationHasReqDto): Promise<boolean> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/has/${this.key(dto.from)}/${this.key(
          dto.to
        )}/${dto.relationType}`
      )
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async multiHas(dto: RelationMultiHasReqDto): Promise<RelationMultiHasResDto> {
    return this.httpService
      .get(
        `${this.relationConfigService.uri}/multiHas/${this.key(
          dto.from
        )}/${this.keys(dto.tos)}/${dto.relationType}`
      )
      .pipe(
        map((value: AxiosResponse<RelationMultiHasResDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async remove(dto: RelationRemoveReqDto): Promise<boolean> {
    return this.httpService
      .delete(`${this.relationConfigService.uri}/remove`, {
        params: {
          entityId1: this.key(dto.from),
          entityId2: this.key(dto.to),
          relationType: dto.relationType
        }
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async set(dto: RelationSetReqDto): Promise<boolean> {
    return this.httpService
      .post(`${this.relationConfigService.uri}/set`, {
        createdAt: dto.createdAt,
        entityId1: this.key(dto.from),
        entityId2: this.key(dto.to),
        relationType: dto.relationType
      })
      .pipe(
        map((value: AxiosResponse<boolean>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}

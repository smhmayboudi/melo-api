import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { RelationGetDto } from "./dto/relaton.get.dto";
import { RelationHasDto } from "./dto/relaton.has.dto";
import { RelationMultiHasDto } from "./dto/relaton.multi.has.dto";
import { RelationRemoveDto } from "./dto/relaton.remove.dto";
import { RelationSetDto } from "./dto/relaton.set.dto";
import { RelationConfigService } from "./relation.config.service";
import { EntityRelate } from "./type/EntityRelate";
import { PaginationResult } from "./type/PaginationResult";

@Injectable()
export class RelationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly relationConfigService: RelationConfigService
  ) {}

  get(dto: RelationGetDto): Observable<AxiosResponse<PaginationResult>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/get/${dto.fromEntityId}/${dto.relType}/${dto.limit}`
    );
  }

  has(dto: RelationHasDto): Observable<AxiosResponse<true>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/has/${dto.entityId1}/${dto.entityId2}/${dto.relType}`
    );
  }

  multiHas(dto: RelationMultiHasDto): Observable<AxiosResponse<EntityRelate>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/multiHas/${dto.fromEntityId}/${dto.toEntitiesIds}/${dto.relType}`
    );
  }

  remove(dto: RelationRemoveDto): Observable<AxiosResponse<true>> {
    return this.httpService.post(
      `${this.relationConfigService.uri}/remove`,
      dto
    );
  }

  set(dto: RelationSetDto): Observable<AxiosResponse<true>> {
    return this.httpService.post(`${this.relationConfigService.uri}/set`, dto);
  }
}

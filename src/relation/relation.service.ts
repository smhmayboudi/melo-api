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

  get(
    relationDtoGet: RelationGetDto
  ): Observable<AxiosResponse<PaginationResult>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/get/${relationDtoGet.fromEntityId}/${relationDtoGet.relType}/${relationDtoGet.limit}`
    );
  }

  has(relationDtoHas: RelationHasDto): Observable<AxiosResponse<true>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/has/${relationDtoHas.entityId1}/${relationDtoHas.entityId2}/${relationDtoHas.relType}`
    );
  }

  multiHas(
    relationDtoMultiHas: RelationMultiHasDto
  ): Observable<AxiosResponse<EntityRelate>> {
    return this.httpService.get(
      `${this.relationConfigService.uri}/multiHas/${relationDtoMultiHas.fromEntityId}/${relationDtoMultiHas.toEntitiesIds}/${relationDtoMultiHas.relType}`
    );
  }

  remove(
    relationDtoRemove: RelationRemoveDto
  ): Observable<AxiosResponse<true>> {
    return this.httpService.post(
      `${this.relationConfigService.uri}/remove`,
      relationDtoRemove
    );
  }

  set(relationDtoSet: RelationSetDto): Observable<AxiosResponse<true>> {
    return this.httpService.post(
      `${this.relationConfigService.uri}/set`,
      relationDtoSet
    );
  }
}

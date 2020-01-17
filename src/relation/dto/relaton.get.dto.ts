import { RelationType } from "../type/RelationType";
import { IsEnum, IsString, IsNumber } from "class-validator";

export class RelationGetDto {
  constructor(
    from: number,
    fromEntityId: string,
    limit: number,
    relType: RelationType
  ) {
    this.from = from;
    this.fromEntityId = fromEntityId;
    this.limit = limit;
    this.relType = relType;
  }

  @IsNumber()
  from: number;

  @IsString()
  fromEntityId: string;

  @IsNumber()
  limit: number;

  @IsEnum(RelationType)
  relType: RelationType;
}

import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";
import { RelationType } from "../type/relation.type";
import { EntityDto } from "./entity.dto";

export class RelationRemoveDto {
  constructor(
    entityDto1: EntityDto,
    entityDto2: EntityDto,
    relType: RelationType
  ) {
    this.entityDto1 = entityDto1;
    this.entityDto2 = entityDto2;
    this.relType = relType;
  }

  @ApiProperty({
    description: "The first entity",
    example: "from"
  })
  @Expose({ name: "entitiyId1" })
  @Transform(value => value.key)
  @ValidateNested()
  entityDto1: EntityDto;

  @ApiProperty({
    description: "The second entity",
    example: "to"
  })
  @Expose({ name: "entitiyId2" })
  @Transform(value => value.key)
  @ValidateNested()
  entityDto2: EntityDto;

  @ApiProperty({
    description: "The relation type",
    example: RelationType.follows
  })
  @IsEnum(RelationType)
  relType: RelationType;
}

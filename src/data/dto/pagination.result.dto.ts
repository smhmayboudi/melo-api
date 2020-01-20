import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsArray, IsNumber, ValidateNested } from "class-validator";
import { Expose } from "class-transformer";

export class PaginationResultDto<T> {
  constructor(results: T[], total: number) {
    this.results = results;
    this.total = total;
  }

  @ApiProperty({
    description: "The results"
  })
  @Allow()
  @Expose()
  @IsArray()
  @ValidateNested({
    each: true
  })
  // TODO: type check
  results: T[];

  @ApiProperty({
    description: "The total number of results",
    example: 1
  })
  @IsNumber()
  total: number;
}

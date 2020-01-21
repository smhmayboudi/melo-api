import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsArray, IsNumber, ValidateNested } from "class-validator";

export class PaginationResultDto<T> {
  constructor(results: T[], total: number) {
    this.results = results;
    this.total = total;
  }

  @ApiProperty({
    description: "The results"
  })
  @Allow()
  @IsArray()
  @ValidateNested({
    each: true
  })
  results: T[];

  @ApiProperty({
    description: "The total number of results",
    example: 1
  })
  @IsNumber()
  total: number;
}

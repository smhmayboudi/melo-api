import { ApiProperty } from "@nestjs/swagger";

export class PaginationResultDto<T> {
  constructor(results: T[], total: number) {
    this.results = results;
    this.total = total;
  }

  @ApiProperty({
    description: "The results"
  })
  results: T[];

  @ApiProperty({
    description: "The total number of results",
    example: 1
  })
  total: number;
}

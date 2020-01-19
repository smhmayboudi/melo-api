---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.entity.ts
unless_exists: true
---
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity({ name: "<%= h.changeCase.snake(name)%>s", orderBy: { id: "ASC" } })
export class <%= h.changeCase.pascal(name)%>Entity {
  constructor(
    id: string
  ) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  @Column({ length: 32, type: "char" })
  id: string;
}

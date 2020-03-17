import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNumber, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "ats", orderBy: { id: "ASC" } })
export class AtEntity {
  constructor(
    count: number,
    created_at: Date,
    expire_at: Date,
    id: number,
    user_id: number,
    token: string
  ) {
    this.count = count;
    this.created_at = created_at;
    this.expire_at = expire_at;
    this.id = id;
    this.user_id = user_id;
    this.token = token;
  }

  @ApiProperty({
    description: "create datetime",
    example: new Date()
  })
  @Column({ type: "tinyint" })
  @IsDate()
  count: number;

  @ApiProperty({
    description: "create datetime",
    example: new Date()
  })
  @Column({ type: "datetime" })
  @IsDate()
  created_at: Date;

  @ApiProperty({
    description: "expire datetime",
    example: new Date()
  })
  @Column({ type: "datetime" })
  @IsDate()
  expire_at: Date;

  @ApiProperty({
    description: "The primary key",
    example: 0
  })
  @PrimaryGeneratedColumn("increment", { type: "int" })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "user identification",
    example: new Date()
  })
  @Column({ type: "int" })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: "access token block",
    example: "a3e45676-9428-46a6-8be0-df754121dcf2"
  })
  @Column({ length: 512, type: "varchar" })
  @IsUUID()
  token: string;
}

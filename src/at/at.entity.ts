import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { At } from "./type/at";

@Entity({ name: "ats", orderBy: { id: "ASC" } })
export class AtEntity implements At {
  constructor(
    create_at: Date,
    expire_at: Date,
    id: number,
    user_id: number,
    token: string
  ) {
    this.create_at = create_at;
    this.expire_at = expire_at;
    this.id = id;
    this.user_id = user_id;
    this.token = token;
  }

  @ApiProperty({
    description: "create datetime",
    example: new Date()
  })
  @Column({ type: "datetime" })
  @IsDate()
  create_at: Date;

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
  @Column({ length: 512, nullable: false, type: "varchar" })
  @IsUUID()
  token: string;
}

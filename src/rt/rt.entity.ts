import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "rts", orderBy: { id: "ASC" } })
export class RtEntity {
  constructor(
    create_at: Date,
    description: string,
    expire_at: Date,
    id: number,
    is_blocked: boolean,
    user_id: number,
    token: string
  ) {
    this.create_at = create_at;
    this.description = description;
    this.expire_at = expire_at;
    this.id = id;
    this.is_blocked = is_blocked;
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
    description: "description of blocked",
    example: "This token is bridged."
  })
  @Column({ type: "text" })
  @IsString()
  description: string;

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
    description: "is blockeed",
    example: false
  })
  @Column({ type: "boolean" })
  @IsBoolean()
  is_blocked: boolean;

  @ApiProperty({
    description: "user identification",
    example: new Date()
  })
  @Column({ type: "int" })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: "refresh token",
    example: new Date()
  })
  @Column({ length: 256, nullable: false, type: "varchar" })
  @IsString()
  token: string;
}

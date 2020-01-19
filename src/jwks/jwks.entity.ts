import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity {
  constructor(id: string, public_key: string, private_key: string) {
    this.id = id;
    this.public_key = public_key;
    this.private_key = private_key;
  }

  @ApiProperty({
    description: "The primary key",
    example: "4f38f054-38e9-11ea-9e09-0242ac110004"
  })
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  id: string;

  @ApiProperty({
    description: "The primary key",
    example: `
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
`
  })
  @Column({ nullable: false, type: "text" })
  @Exclude()
  @IsString()
  private_key: string;

  @ApiProperty({
    description: "The primary key",
    example: `
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
`
  })
  @Column({ nullable: false, type: "text" })
  @IsString()
  public_key: string;
}

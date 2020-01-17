import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Jwks } from "./type/jwks";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity implements Jwks {
  constructor(id: string, public_key: string, private_key: string) {
    this.id = id;
    this.public_key = public_key;
    this.private_key = private_key;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, type: "text" })
  @Exclude()
  private_key: string;

  @Column({ nullable: false, type: "text" })
  public_key: string;
}

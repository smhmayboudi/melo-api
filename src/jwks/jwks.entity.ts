import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Jwks } from "./type/jwks";

@Entity({ name: "jwkss", orderBy: { kid: "ASC" } })
export class JwksEntity implements Jwks {
  constructor(kid: number, public_key: string, private_key: string) {
    this.kid = kid;
    this.public_key = public_key;
    this.private_key = private_key;
  }

  @Column({ length: 11, type: "int" })
  @PrimaryGeneratedColumn()
  kid: number;

  @Column({ nullable: false, type: "text" })
  @Exclude()
  private_key: string;

  @Column({ nullable: false, type: "text" })
  public_key: string;
}

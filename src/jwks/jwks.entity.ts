import { Exclude } from "class-transformer";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { Jwks } from "./type/jwks";

@Entity({ name: "jwkss", orderBy: { kid: "ASC" } })
export class JwksEntity implements Jwks {
  constructor(kid: string, publicKey: string, privateKey: string) {
    this.kid = kid;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  kid: string;

  @Column({ nullable: false, name: "privateKey", type: "text" })
  @Exclude()
  privateKey: string;

  @Column({ nullable: false, name: "publicKey", type: "text" })
  publicKey: string;
}

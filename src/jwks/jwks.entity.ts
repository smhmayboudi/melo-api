import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity {
  constructor(kid: number, publicKey: string, privateKey: string) {
    this.kid = kid;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  // constructor(partial: Partial<Jwks>) {
  //   Object.assign(this, partial);
  // }

  @Column({ length: 11, type: "int" })
  @PrimaryGeneratedColumn()
  kid: number;

  @Column({ nullable: false, type: "text" })
  publicKey: string | null;

  @Column({ nullable: false, type: "text" })
  privateKey: string | null;
}

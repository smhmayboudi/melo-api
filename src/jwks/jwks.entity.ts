import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity {
  constructor(id: number, publicJwks: string, privateJwks: string) {
    this.id = id;
    this.publicJwks = publicJwks;
    this.privateJwks = privateJwks;
  }

  // constructor(partial: Partial<Jwks>) {
  //   Object.assign(this, partial);
  // }

  @Column({ length: 11, type: "int" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "text" })
  publicJwks: string | null;

  @Column({ nullable: false, type: "text" })
  privateJwks: string | null;
}

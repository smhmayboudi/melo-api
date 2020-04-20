import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "jwkss", orderBy: { id: "ASC" } })
export class JwksEntity {
  constructor(id: string, public_key: string, private_key: string) {
    this.id = id;
    this.public_key = public_key;
    this.private_key = private_key;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  private_key: string;

  @Column({ type: "text" })
  public_key: string;
}

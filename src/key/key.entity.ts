import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "keys", orderBy: { id: "ASC" } })
export class KeyEntity {
  constructor(id: number, publicKey: string, privateKey: string) {
    this.id = id;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  // constructor(partial: Partial<Key>) {
  //   Object.assign(this, partial);
  // }

  @Column({ length: 11, type: "int" })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "text" })
  publicKey: string | null;

  @Column({ nullable: false, type: "text" })
  privateKey: string | null;
}

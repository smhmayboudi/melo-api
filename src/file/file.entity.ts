import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "files", orderBy: { id: "ASC" } })
export class FileEntity {
  constructor(
    created_at: Date,
    bucket: string,
    e_tag: string,
    file_key: string,
    id: number,
    mime_type: string,
    owner_user_id: number,
    size: number
  ) {
    this.created_at = created_at;
    this.bucket = bucket;
    this.e_tag = e_tag;
    this.file_key = file_key;
    this.id = id;
    this.mime_type = mime_type;
    this.owner_user_id = owner_user_id;
    this.size = size;
  }

  @Column({ length: 200, type: "varchar" })
  bucket: string;

  @Column({ type: "date" })
  created_at: Date;

  @Column({ length: 200, type: "varchar" })
  file_key: string;

  @Column({ length: 200, type: "varchar" })
  e_tag: string;

  @PrimaryGeneratedColumn("increment", { type: "int" })
  id: number;

  @Column({ length: 50, type: "varchar" })
  mime_type: string;

  @Column({ type: "int" })
  owner_user_id: number;

  @Column({ type: "int" })
  size: number;
}

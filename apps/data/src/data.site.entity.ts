import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "site" })
export class DataSiteEntity {
  constructor(created_at: Date, song_id: number) {
    this.created_at = created_at;
    this.song_id = song_id;
  }

  @PrimaryGeneratedColumn("increment", { type: "int" })
  song_id: number;

  @Column({ type: "date" })
  created_at: Date;
}

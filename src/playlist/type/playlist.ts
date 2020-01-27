import { Document } from "mongoose";

export interface Playlist extends Document {
  readonly id: string;
  readonly public: boolean;
  readonly downloads_count: number;
  readonly followers_count: number;
  readonly owner_user_id: string;
  readonly photo_id: string;
  readonly release_date: Date;
  readonly songs_ids: string;
  readonly title: string;
  readonly tracks_count: number;
}

import { Document } from "mongoose";

export interface PlaylistInterface extends Document {
  downloads_count: number;
  followers_count: number;
  isPublic: boolean;
  owner_user_id: string;
  photo_id: string;
  release_date: Date;
  songs_ids: number[];
  title: string;
  tracks_count: number;
}

import { Document } from "mongoose";

export interface Playlist extends Document {
  downloads_count: number;
  followers_count: number;
  id: string;
  owner_user_id: string;
  photo_id: string;
  isPublic: boolean;
  release_date: Date;
  songs_ids: number[];
  title: string;
  tracks_count: number;
}

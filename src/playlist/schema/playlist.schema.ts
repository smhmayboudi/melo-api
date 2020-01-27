import * as mongoose from "mongoose";

export const PlaylistSchema = new mongoose.Schema({
  downloads_count: Number,
  followers_count: Number,
  owner_user_id: String,
  photo_id: String,
  public: Boolean,
  release_date: Date,
  songs_ids: String,
  title: String,
  tracks_count: Number
});

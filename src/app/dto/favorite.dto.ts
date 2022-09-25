import { Video } from "../models/video";

export interface FavoriteDto {
  userId: string;
  video: Video;
};

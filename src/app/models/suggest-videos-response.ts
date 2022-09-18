import { Video } from "./video";

export interface SuggestVideosResponse {
  continuation: string;
  videos: Video[];
}

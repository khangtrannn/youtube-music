import { Video } from "./video";

export interface SuggestVideosResponse {
  visitorData: string;
  continuation: string;
  videos: Video[];
}

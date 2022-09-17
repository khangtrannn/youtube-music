import { Video } from "./video";

export interface SearchVideoResponse {
  videos: Video[];
  continuation: string;
  visitorData: string;
}

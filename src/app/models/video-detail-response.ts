import { Video } from "./video";

export interface VideoDetailResponse {
  visitorData: string;
  continuation: string;
  videoDetail: Video,
  suggestVideos: Video[];
}

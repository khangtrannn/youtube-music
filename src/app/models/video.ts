import { Channel } from "./channel";

export class Video {
  id!: string;
  title!: string;
  duration!: string;
  view!: string;
  publishedTime!: string;
  thumbnail!: string;
  channel!: Channel;
  loading = false;
}

export class VideoLoading extends Video {
  override loading = true;
}
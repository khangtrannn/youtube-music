import { Channel } from "./channel";

export interface Video {
  id: string;
  title: string;
  duration: string;
  view: string;
  publishedTime: string;
  thumbnail: string;
  channel: Channel;
}

import { VideoService } from 'src/app/services/video.service';
import { Component, Input } from '@angular/core';
import { Video } from 'src/app/models/video';
import { BackgroundService } from './../../../services/background.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {
  @Input() video!: Video;

  constructor(private backgroundService: BackgroundService, private videoService: VideoService) {}

  onTouch(): void {
    this.backgroundService.setBackground(this.video.thumbnail);
    this.videoService.changeVideo(this.video.id);
  }
}

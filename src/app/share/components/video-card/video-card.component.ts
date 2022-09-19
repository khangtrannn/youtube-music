import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { BackgroundService } from './../../../services/background.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {
  @Input() video!: Video;

  constructor(private router: Router, private backgroundService: BackgroundService) {}

  onTouch(): void {
    this.router.navigate([`/music/${this.video.id}`]);
    this.backgroundService.setBackground(this.video.thumbnail);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-suggest-video',
  templateUrl: './suggest-video.component.html',
  styleUrls: ['./suggest-video.component.scss']
})
export class SuggestVideoComponent implements OnInit {
  @Input() set suggestVideos(value: Video[] | undefined) {

    console.log(value);
    if (value) {
      this.videos = value;
      this.isVideoLoad = false;
    }
  }

  videos: Video[] = [];

  isVideoLoad = true;
  numberOfSkeletons = 9;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onVideoTouched(videoId: string): void {
    this.router.navigate([`/music/${videoId}`]);
  }

  onScroll(): void {

  }
}

import { VideoService } from './services/video.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'KTMusic';
  videos!: any[];
  videoId!: string;
  videoTitle!: string;

  constructor(
    private videoService: VideoService
  ) {}

  onVideoChanged(data: any): void {
    const dataJson = JSON.parse(data);
    this.videoId = dataJson.videoId;
    this.videoTitle = dataJson.videoTitle;
  }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe((data) => {
      console.log(data);
      this.videos = data;
      this.videoId = this.videos[0].resourceId.videoId;
      this.videoTitle = this.videos[0].title;
    });
  }
}

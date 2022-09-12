import { VideoService } from './services/video.service';
import { Component, OnInit } from '@angular/core';

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

  keyword!: string;
  isSearching = false;

  constructor(
    private videoService: VideoService
  ) {}

  onVideoChanged(data: any): void {
    const dataJson = JSON.parse(data);
    this.videoId = dataJson.resourceId.videoId;
    this.videoTitle = dataJson.videoTitle;

    // const thumbnail = (dataJson.thumbnails.maxres || dataJson.thumbnails.standard || dataJson.thumbnails.high)?.url;
    // document.getElementsByTagName('body')[0].style.background = `url(${thumbnail})`;
  }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe((response) => {
      this.videos = response.filter((response) => !!response.resourceId?.videoId);

      if (this.videos.length) {
        this.onVideoChanged(this.videos[0].toString());
      }
    });
  }

  onSearch(): void {
    this.isSearching = true;
    this.videoService.searchVideos(this.keyword).subscribe((response) => {
      console.log(response);
      this.isSearching = false;
      this.videos = response;
    })
  }
}

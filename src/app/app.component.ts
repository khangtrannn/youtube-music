import { VideoService } from './services/video.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

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
  background!: string;

  keyword!: string;
  isSearching = false;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('background') backgroundRef!: ElementRef<HTMLImageElement>;

  constructor(private videoService: VideoService) {}

  onVideoChanged(data: any): void {
    const dataJson = JSON.parse(data);
    this.videoId = dataJson.resourceId.videoId;
    this.videoTitle = dataJson.videoTitle;
    this.background = dataJson.thumbnail;
    this.backgroundRef.nativeElement.src = this.background;
  }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe((response) => {
      this.videos = response.filter(
        (response) => !!response.resourceId?.videoId
      );

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
    });
  }
}

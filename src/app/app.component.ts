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
    this.videoId = dataJson.videoId;
    this.videoTitle = dataJson.videoTitle;
    this.background = dataJson.thumbnail;
    this.backgroundRef.nativeElement.src = this.background;
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.isSearching = true;
    this.videoService.searchVideo(this.keyword).subscribe((response) => {
      this.isSearching = false;
      this.videos = response.videos;
    });
  }

  onSearchScroll(): void {
    this.videoService.searchVideoContinuation().subscribe((response) => {
      this.videos.push(...response.videos);
    });
  }
}

import { VideoService } from './../../services/video.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  videos: Video[] = [];

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(switchMap((params) => this.videoService.searchVideo(params['keyword'])))
      .subscribe((videos) => this.videos = videos);
  }

  onSearchScroll(): void {
    this.videoService.searchVideoContinuation().subscribe((response) => {
      this.videos.push(...response.videos);
    });
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/video';
import { SearchVideoService } from 'src/app/services/search-video.service';

const KEY_WORD = 'study with me';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  constructor(
    private searchVideoService: SearchVideoService,
    private activatedRoute: ActivatedRoute
  ) {}

  getInitVideos(): Observable<Video[]> {
    return this.searchVideoService.searchVideo(
      this.activatedRoute.snapshot.queryParamMap.get('keyword') || KEY_WORD
    );
  }

  getMoreVideos(): Observable<Video[]> {
    return this.searchVideoService.searchVideoContinuation();
  }
}
